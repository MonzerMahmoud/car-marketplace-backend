import { Controller, Get, Body, Post, Req, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { SearchCarDto } from './dto/search-car.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { Roles } from 'src/user/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Roles(Role.Superuser, Role.User)
  @Get('search')
  findOne(@Query() params: SearchCarDto) {
    return this.carService.find(params);
  }

  @Roles(Role.Superuser)
  @Post('create')
  create(@Body() createCarDto: CreateCarDto, @Req() req: Request) {
    return this.carService.create(createCarDto, req['user'].sub);
  }

  @Get('filters')
  filter(@Query('for') filter: string) {
    return this.carService.getCarsFilters(filter);
  }
}
