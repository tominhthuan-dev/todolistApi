/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
  ) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(
      Number(id),
    );
  }

  @Post()
  create(@Body() body: any) {
    return this.todosService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.todosService.update(
      Number(id),
      body,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(
      Number(id),
    );
  }
}