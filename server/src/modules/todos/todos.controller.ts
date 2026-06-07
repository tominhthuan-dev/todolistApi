/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
  ) {}

  @Get()
  findAll(@Query('userId') userId: string) {
    if (userId) {
      return this.todosService.findAllByUserId(Number(userId));
    } else {
      return [];
    }
  }

  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.todosService.findAllByUserId(Number(userId));
  }
  
  @Post()
  create(@Body() body: any) {
    return this.todosService.create(body);
  }
@Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.delete(Number(id));
  }
  
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('title') title: string,
  ) {
    return this.todosService.update(Number(id), title);
  }
}