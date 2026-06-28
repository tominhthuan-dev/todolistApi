import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,// Import UsersModule để AuthService có thể sử dụng UsersService
    JwtModule.register({
      secret: 'my-secretKey',//khóa bí mật JWT,Phải giống secret trong JwtStrategy
      signOptions: { expiresIn: '1h'},//thời gian hết hạn 
    }),
  ],
  // Các Controller thuộc AuthModule
  controllers: [AuthController],
   // Các Service và Provider của Module
  providers: [ AuthService, JwtStrategy],
})
export class AuthModule {}