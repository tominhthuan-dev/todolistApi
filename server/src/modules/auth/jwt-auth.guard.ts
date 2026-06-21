// nhiệm vụ chặn repuest => kiểm tra xem có jwt token ko => gọi JwtStrategy để xác thực token
import {Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
