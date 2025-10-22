import type { Document, ObjectId } from "mongoose";

export interface UserInterface extends Document {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	dob: Date;
}

export interface SessionInterface extends Document {
	userId: ObjectId;
	token: string;
	browser: string;
	OS: string;
	country: string;
	region: string;
	city: string;
	ip: string;
	active: boolean;
	expiresAt: Date;
}
