// nhiệm vụ chặn repuest => kiểm tra xem có jwt token ko => gọi JwtStrategy để xác thực token
import {Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';//tìm hiểu có chế mặc định 

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
