import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    // đăng nhập
    async login(body: { username: string; password: string }) {
        // tìm user
        const user = await this.usersService.findByUsername(body.username);
        // không tìm thấy user
        if (!user) {
            throw new UnauthorizedException("Sai tài khoản");
        }
        // sai password
        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException("Sai mật khẩu");
        }

        // login thành công
        // payload chứa thông tin user, sẽ được mã hóa vào JWT token
        const payload = {sub: user.id, username: user.username, role: user.role}; 
        //tạo JWT token
        const accessToken = this.jwtService.sign(
            payload,
            {
                expiresIn: '30s',
            }
        );
        //tạo refreshToken
        const refreshToken = this.jwtService.sign(
            payload,
            {
                expiresIn: '1d',
            }
        );
        return {
            access_token: accessToken,
            refresh_token: refreshToken, 
        };
    }

    // đăng ký
    async register(body: { username: string; password: string }) {
        // kiểm tra username đã tồn tại chưa
        const existingUser = await this.usersService.findByUsername(body.username);
        if (existingUser) {
            throw new UnauthorizedException("Username đã tồn tại");
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        // tạo user mới với role mặc định là "user"
        const newUser = await this.usersService.createUser(body.username, hashedPassword, "user");
        // trả về thông tin user mới tạo (không bao gồm password)
        return {
            id: newUser.id,
            username: newUser.username,
            role: newUser.role,
        };
    }

    async refreshToken(refreshToken: string){
        console.log(
        "Refresh token nhận được:",
        refreshToken
    );
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: 'my-secretKey'
            });
console.log(
            "Payload:",
            payload
        );
            const newPayload = {
                sub: payload.sub,
                username: payload.username,
                role: payload.role,
            };

            const accessToken = this.jwtService.sign(newPayload, {expiresIn: "1m",});

            return {
                access_token: accessToken,
            };
        } catch {
            throw new UnauthorizedException("Refresh Token không hợp lệ",);
        }
    }
}
