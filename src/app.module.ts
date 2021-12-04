import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CitaModule } from './cita/cita.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bjkrec23krg1ydnk3rgn-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uarl4dtf8jpbwk9a',
      password: 'PIXp543ThmbQESTmOS6I',
      database: 'bjkrec23krg1ydnk3rgn',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CitaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
