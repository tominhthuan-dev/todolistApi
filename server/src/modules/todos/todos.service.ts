/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  findAllByUserId(userId: number) {
    return this.todosRepository.findAllByUserId(userId);
  }

  create(body: any) {
    const newTodo = {
      id: Date.now(),
      title: body.title,
      userId: body.userId,
    };

    this.todosRepository.create(newTodo);

    return newTodo;
  }

  delete(id: number) {
    return this.todosRepository.delete(id);
  }

  update(id: number, title: string) {
    return this.todosRepository.update(id, title);
  }
  /*findOne(id: number) {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    } else {
      return {...todo};
    }
  }

  create(todo: any) {
    const newTodo = {
      id: Date.now(),
      ...todo,
    };

    this.todos.push(newTodo);

    return newTodo;
  }

  update(id: number, body: any) {
    const todo = this.todos.find(todos => todos.id === id);

    if(!todo) {
      throw new NotFoundException('Todo not found');
    }

    Object.assign(todo, body);

    return {...todo};
  }

  remove(id: number) {
    const todo = this.findOne(id);

    this.todos = this.todos.filter(item => item.id !== todo.id);

    return {message:'Todo deleted successfully'};
  }*/
}