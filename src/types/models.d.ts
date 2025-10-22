import type { Document } from "mongoose";

export interface UserInterface extends Document {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	dob: Date;
}
