import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository,
    ) {}

    async findByUsername(username: string) {
        return this.usersRepository.findByUsername(username);
    }

    async findById(id: number) {
        return this.usersRepository.findById(id);
    }

    async createUser(username: string, password: string, role: string) {
        return this.usersRepository.createUser(username, password, role);
    }
}
