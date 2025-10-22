import mongoose from "mongoose";
import { DATABASE_URL } from "$env/static/private";

export async function databaseConnection() {
	if (mongoose.connection.readyState === 1) return mongoose.connection;
	try {
		const { connection } = await mongoose.connect(DATABASE_URL);
		return connection;
	} catch (error) {
		throw error;
	}
}
