/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  async findAllByUserId(userId: number) {
    return await this.todosRepository.findAllByUserId(userId);
  }
  
  async create(title: string, userId: number) {
    return await this.todosRepository.create(title, userId);
  }

  async delete(id: number) {
    return await this.todosRepository.delete(id);
  }
  
  async update(id: number, title: string) {
    return await this.todosRepository.update(id, title);
  }
}