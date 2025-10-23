import jwt from "jsonwebtoken";
import type { TokenPayload, TokenResponse } from "$types";
import { JWT_ACCESS_TOKEN_SECRET_KEY, JWT_REFRESH_TOKEN_SECRET_KEY } from "$env/static/private";

export function createTokens(tokenPayload: TokenPayload): TokenResponse {
	return {
		access: accessToken(tokenPayload._id),
		refresh: refreshToken(tokenPayload)
	};
}

function accessToken(_id: string) {
	return jwt.sign({ _id }, JWT_ACCESS_TOKEN_SECRET_KEY, { expiresIn: "1d" });
}

function refreshToken(tokenPayload: TokenPayload) {
	return jwt.sign(tokenPayload, JWT_REFRESH_TOKEN_SECRET_KEY, { expiresIn: "30d" });
}
