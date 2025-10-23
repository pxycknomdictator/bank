import { Session } from "$models";
import { UAParser } from "ua-parser-js";
import { databaseConnection } from "$db";
import { error, json } from "@sveltejs/kit";
import { NODE_ENV } from "$env/static/private";
import type { TokenPayload, userBodyDTO } from "$types";
import { verifyHash, UserService, createTokens, fetchSessionInformation } from "$services";

const userService = new UserService();

export async function POST(event) {
	await databaseConnection();
	const form: userBodyDTO = await event.request.json();

	const exists = await userService.findEmail(form.email);
	if (!exists) return error(400, { message: "Credentials Error" });

	const isPasswordCorrect = await verifyHash(exists.password, form.password);
	if (!isPasswordCorrect) return error(400, { message: "Credentials Error" });

	const payload: TokenPayload = {
		_id: exists._id.toString(),
		username: exists.username,
		email: exists.email
	};

	const tokens = createTokens(payload);

	event.cookies.set("accessToken", tokens.access, {
		path: "/",
		httpOnly: true,
		secure: NODE_ENV === "production",
		sameSite: NODE_ENV === "production" ? "strict" : "lax",
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
	});

	const ip = event.getClientAddress();
	const session = await fetchSessionInformation(event);
	const userAgentParser = new UAParser(event.request.headers.get("user-agent")!);

	await Session.create({
		...(session ?? { ip }),
		token: tokens.refresh,
		userId: exists._id,
		browser: userAgentParser.getBrowser().name || "unknown",
		OS: userAgentParser.getOS().name || "unknown"
	});

	return json({ message: "Sign in successfully", token: tokens.access });
}
