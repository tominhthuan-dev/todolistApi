import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AdminController],
    providers: [AdminService, AdminRepository]
})
export class AdminModule {}
