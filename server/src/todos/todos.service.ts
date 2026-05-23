/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TodosService {
  private todos = [
    {
      id: 1,
      title: 'Learn NestJS',
    },
    {
      id: 2,
      title: 'Build a REST API',
    },
    {
      id: 3,
      title: 'Deploy to production',
    },
    {
      id: 4,
      title: 'Write documentation',
    },
  ];

  findAll() {
    return this.todos.map(todo => ({
      ...todo,
    }));
  }

  findOne(id: number) {
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
  }
}