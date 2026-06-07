import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodosRepository {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) {}

    async findAllByUserId(userId: number) {
        //return this.todos.filter(todo => todo.userId === userId);
        return this.todoRepository.find({
            where: { user_id: userId },
        });
    }

    async create(title: string, userId: number) {
        const newTodo = this.todoRepository.create({
            title,
            user_id: userId,
        });
        return await this.todoRepository.save(newTodo);
    }

    async delete(id: number) {
        const result = await this.todoRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return { message: `xóa thành công` };
    }

    async update(id: number, title: string) {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        todo.title = title;
        return await this.todoRepository.save(todo);
    }

}