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

export interface AccountInterface extends Document {
	userId: ObjectId;
	account_number: string;
	account_holder_name: string;
	iban: string;
	account_type: "Savings" | "Current" | "Fixed Deposit";
	branch_code: string;
	branch_name: string;
	balance: number;
	currency: "PKR" | "USD" | "EUR";
	account_status: "Active" | "Blocked" | "Dormant";
	is_frozen: boolean;
	last_transaction_date?: Date;
	cnic: string;
	zakat_deduction: boolean;
	daily_limit: number;
	monthly_limit: number;
}

export interface CardInterface extends Document {
	userId: ObjectId;
	accountId: ObjectId;
	card_number: string;
	card_holder_name: string;
	cvv: string;
	card_type: "Debit" | "Credit" | "Prepaid";
	card_brand: "Visa" | "Mastercard" | "UnionPay" | "PayPal";
	issue_date: Date;
	expiry_date: Date;
	card_status: "Active" | "Blocked" | "Expired" | "Lost" | "Stolen";
	pin_set: boolean;
	pin_code?: string;
	failed_pin_attempts: number;
	pin_locked: boolean;
	daily_atm_limit: number;
	daily_online_limit: number;
	last_used_date?: Date;
	total_transactions_count: number;
	delivery_status?: "Pending" | "Dispatched" | "Delivered";
}
