import { Module } from '@nestjs/common';

import {TypeOrmModule} from "@nestjs/typeorm";
import { User } from '../entities/user.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
