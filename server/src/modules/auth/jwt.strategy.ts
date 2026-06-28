/*
nhiệm vụ lấy token từ header 
=> giải mã token 
=> kiểm tra chữ ký 
=> kiểm tra thời gian hết hạn 
=> nếu hợp lệ thì trả về payload cho controller
*/ 
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'my-secretKey',
        });
    }

    async validate(payload: any) {
        console.log( "JWT payload:", payload);
        return {
            sub: payload.sub,
            username: payload.username,
            role: payload.role,
        };
    }
}