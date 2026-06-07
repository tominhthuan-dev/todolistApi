import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    // đăng nhập
    async login(body: any) {
        // tìm user
        const user = await this.authRepository.findByUsername( body.username);
        // không tìm thấy user
        if (!user) {
            throw new UnauthorizedException("Sai tài khoản");
        }
        // sai password
        if (user.password !== body.password) {
            throw new UnauthorizedException("Sai mật khẩu");
        }

        // login thành công
        return user;
    }  
}
