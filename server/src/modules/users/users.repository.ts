import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async createUser(username: string, password: string, role: string) {
    const user = this.userRepository.create({
      username,
      password,
      role,
    });// tạo object user nhưng chưa lưu vào database
    return this.userRepository.save(user);// lưu vào database
  }

}