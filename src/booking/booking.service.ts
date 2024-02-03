import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CarService } from 'src/car/car.service';
import { BookingStatus } from 'src/common/enums/booking-status.enum';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly userService: UserService,
    private readonly carService: CarService,
  ) {}

  async create(createBookingDto: CreateBookingDto, userId: number) {
    const user = await this.userService.findOneById(userId);
    const car = await this.carService.findOneById(createBookingDto.carId);
    if (car.isBooked) {
      return {
        message: 'Car is not available',
      };
    }
    const newBooking = new Booking();
    newBooking.user = user;
    newBooking.car = car;
    const createdBooking = await this.bookingRepository.save(newBooking);
    await this.carService.updateBookingAvailability(car.id, false);
    return createdBooking;
  }

  async findAll(userId: number) {
    return await this.bookingRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(id: number, userId: number) {
    return await this.bookingRepository.findOne({
      where: { id: id, user: { id: userId } },
    });
  }

  async updateBookingStatus(id: number, status: string, userId: number) {
    if (status == BookingStatus.Cancelled) {
      const booking = await this.findOne(id, userId);
      const hoursDifference =
        (new Date().getTime() - booking.startDate.getTime()) / (1000 * 3600);
      if (hoursDifference <= 24) {
        return {
          message: 'You can only cancel a booking after 24 hours',
        };
      }
    }
    await this.bookingRepository.update(id, { bookingStatus: status });
    return {
      message: 'Booking status updated successfully',
    };
  }
}
