export interface createUserDTO {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	dob: Date;
}

export interface userBodyDTO {
	email: string;
	password: string;
}
