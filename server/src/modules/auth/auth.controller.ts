import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    login(@Body() body: { username: string; password: string }) {
        return this.authService.login(body);
    }

    @Post("register")
    register(@Body() body: {username: string; password: string}){
        return this.authService.register(body);
    }

    @Post("refresh")
    refresh(@Body() body: RefreshTokenDto) {
        return this.authService.refreshToken(body.refresh_token);
    }
}
