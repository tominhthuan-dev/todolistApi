import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
//import { Roles } from '../auth/roles.decorator';
//import { RolesGuard } from '../auth/roles.guard';
import { AdminService } from './admin.service';

import { Roles } from 'src/common/decorators/roles.decorator';

import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('users')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    findAllUsers() {
        return this.adminService.findAllUsers();
    }

    @Get('profile')//methor
    @UseGuards(JwtAuthGuard)//?
    getProfile(@Request() request) {
        return request.user;
    }
}
