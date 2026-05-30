import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TodosRepository {
    private todos = [
        { 
            id: 1, 
            title: 'Learn NestJS1',
            userId: 2,
         },
        { 
            id: 2, 
            title: 'Build a TODO app', 
            userId: 2,
        },
        { 
            id: 3, 
            title: 'Deploy the app',
            userId: 3,
        },
    ];

    findAllByUserId(userId: number) {
        return this.todos.filter(todo => todo.userId === userId);
    }

    create(todo: any)  {
        this.todos.push(todo);
    }

    delete(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        return { message: `Todo with id ${id} deleted successfully` };
    }

    update(id: number, title: string) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        todo.title = title;
        return { ...todo };
    }
}