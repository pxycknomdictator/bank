import { User } from "$models";
import type { createUserDTO } from "$types";

export class UserService {
	private readonly userModel: typeof User = User;

	public async create(createUserDTO: createUserDTO) {
		return await this.userModel.create(createUserDTO);
	}

	public async findEmail(email: string) {
		return await this.userModel.findOne({ email }).select("username email +password").lean();
	}

	public async findUser(email: string, username: string) {
		return await this.userModel.findOne({ $or: [{ email }, { username }] }).lean();
	}
}
