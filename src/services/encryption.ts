import argon2, { type Options } from "argon2";
import { ARGON2_SECRET_KEY } from "$env/static/private";

const options: Options = Object.freeze({
	hashLength: 69,
	parallelism: 2,
	type: argon2.argon2id,
	secret: Buffer.from(ARGON2_SECRET_KEY, "utf-8")
});

export async function hashPassword(password: string) {
	return await argon2.hash(password, options);
}

export async function verifyHash(hash: string, password: string) {
	return await argon2.verify(hash, password, { secret: options.secret });
}
