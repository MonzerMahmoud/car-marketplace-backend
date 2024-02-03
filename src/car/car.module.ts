import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car } from './entities/car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService, TypeOrmModule],
})
export class CarModule {}
