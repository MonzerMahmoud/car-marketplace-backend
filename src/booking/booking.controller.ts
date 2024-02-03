import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from 'src/common/enums/booking-status.enum';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @Req() req: Request) {
    return this.bookingService.create(createBookingDto, req['user'].sub);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.bookingService.findAll(req['user'].sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.bookingService.findOne(+id, req['user'].sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Query('status') status: BookingStatus,
    @Req() req: Request,
  ) {
    return this.bookingService.updateBookingStatus(
      +id,
      status,
      req['user'].sub,
    );
  }
}
