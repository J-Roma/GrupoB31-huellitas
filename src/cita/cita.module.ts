import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/user/models/user.entity';
import { UserModule } from 'src/user/user.module';
import { CitaController } from './cita.controller';
import { CitaService } from './cita.service';
import { CitaEntity } from './models/cita.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([CitaEntity, UserEntity])
  ],
  controllers: [CitaController],
  providers: [CitaService]
})
export class CitaModule {}
