import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stategy';

@Module({
  imports:[
      UserModule,
      PassportModule.register({
          defaultStrategy: "jwt",
          property: 'user',
          session: false
      }),
      JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: 3600}
      })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports:[PassportModule, JwtModule]
})
export class AuthModule {}
