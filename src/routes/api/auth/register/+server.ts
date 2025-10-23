import { databaseConnection } from "$db";
import type { createUserDTO } from "$types";
import { error, json } from "@sveltejs/kit";
import { hashPassword, UserService } from "$services";

const userService = new UserService();

export async function POST({ request }) {
	await databaseConnection();
	const form: createUserDTO = await request.json();

	const exists = await userService.findUser(form.email, form.username);
	if (exists) return error(409, { message: "username or email is already taken" });

	const hash = await hashPassword(form.password);

	const user = await userService.create({ ...form, password: hash });
	if (!user) return error(400, { message: "Error while creating new user" });

	const response = {
		_id: user._id,
		username: user.username,
		email: user.email
	};

	return json({ message: "Sign up successfully", user: response });
}
