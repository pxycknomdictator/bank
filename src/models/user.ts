import mongoose, { Schema, model } from "mongoose";
import type { Model } from "mongoose";
import type { UserInterface } from "$types";

const userSchema = new Schema<UserInterface>(
	{
		first_name: {
			type: String,
			required: [true, "first name is required"],
			minlength: [1, "first name contain at least 1 character long"]
		},
		last_name: {
			type: String,
			required: [true, "last name is required"],
			minlength: [1, "last name contain at least 1 character long"]
		},
		username: {
			type: String,
			unique: true,
			trim: true,
			required: [true, "username is required"],
			minlength: [1, "username contain at least 1 character long"]
		},
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			required: [true, "email is required"]
		},
		password: {
			type: String,
			select: false,
			required: [true, "password is required"],
			minlength: [8, "password must be 8 characters long"]
		},
		dob: {
			type: Date,
			required: [true, "dob is required"]
		}
	},
	{ timestamps: true }
);

export const User: Model<UserInterface> =
	mongoose.models?.User || model<UserInterface>("User", userSchema);
