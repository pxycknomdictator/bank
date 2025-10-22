import mongoose, { Schema, model } from "mongoose";
import type { Model } from "mongoose";
import type { SessionInterface } from "$types";

const sessionSchema = new Schema<SessionInterface>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "user id is required"]
		},
		token: {
			type: String,
			unique: true,
			required: [true, "token is required"]
		},
		browser: {
			type: String,
			required: [true, "browser is required"]
		},
		OS: {
			type: String,
			required: [true, "OS is required"]
		},
		country: {
			type: String
		},
		region: {
			type: String
		},
		city: {
			type: String
		},
		ip: {
			type: String,
			required: [true, "ip is required"]
		},
		active: {
			type: Boolean,
			default: true
		},
		expiresAt: {
			type: Date,
			default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			index: { expires: 0 }
		}
	},
	{ timestamps: true }
);

export const Session: Model<SessionInterface> =
	mongoose.models?.Session || model<SessionInterface>("Session", sessionSchema);
