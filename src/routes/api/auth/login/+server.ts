import { databaseConnection } from "$db";
import { error, json } from "@sveltejs/kit";
import { NODE_ENV } from "$env/static/private";
import type { TokenPayload, userBodyDTO } from "$types";
import { verifyHash, UserService, createTokens } from "$services";

const userService = new UserService();

export async function POST({ request, cookies }) {
	await databaseConnection();
	const form: userBodyDTO = await request.json();

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

	cookies.set("accessToken", tokens.access, {
		path: "/",
		httpOnly: true,
		secure: NODE_ENV === "production",
		sameSite: NODE_ENV === "production" ? "strict" : "lax"
	});

	return json({ message: "Sign in successfully", token: tokens.access });
}
