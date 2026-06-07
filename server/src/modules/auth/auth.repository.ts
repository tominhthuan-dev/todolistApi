import { Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../entities/user.entity";

@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    // tìm user theo username
    findByUsername(username: string) {
        return this.usersRepository.findOne({
            where: { username },
        });
    }
}