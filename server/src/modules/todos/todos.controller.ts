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
  Request, 
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
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
  
  @UseGuards(JwtAuthGuard)//chech token còn quyền hay ko
  @Post()
  create(@Body() body: { title: string; userId: number }, @Request() request) {
    return this.todosService.create(body.title, request.user.sub);
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