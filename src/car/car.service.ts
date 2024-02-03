import { Injectable } from '@nestjs/common';
import { SearchCarDto } from './dto/search-car.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    private readonly userService: UserService,
  ) {}

  async find(searchCarDto: SearchCarDto) {
    return await this.carRepository.findBy(searchCarDto);
  }

  async findOneById(id: number) {
    const result = await this.carRepository.findOneBy({ id });
    if (!result) {
      throw new Error('Car not found');
    }
    return result;
  }

  async create(createCarDto: CreateCarDto, userId: number) {
    const user = await this.userService.findOneById(userId);

    const newCar = new Car();
    newCar.user = user;
    newCar.model = createCarDto.model;
    newCar.make = createCarDto.make;
    newCar.year = createCarDto.year;
    newCar.color = createCarDto.color;
    newCar.price = createCarDto.price;
    return await this.carRepository.save(newCar);
  }

  async updateBookingAvailability(id: number, available: boolean) {
    const result = await this.carRepository.update(
      { id },
      { isBooked: !available },
    );
    return result.affected ? true : false;
  }

  async getCarsFilters(filter: string) {
    const result = await this.carRepository
      .createQueryBuilder()
      .select(`DISTINCT ${filter}`, 'value')
      .getRawMany();

    return {
      values: result.map((obj) => obj.value),
    };
  }
}
