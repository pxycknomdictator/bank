export interface TokenPayload {
	_id: string;
	username: string;
	email: string;
}

export interface TokenResponse {
	access: string;
	refresh: string;
}
