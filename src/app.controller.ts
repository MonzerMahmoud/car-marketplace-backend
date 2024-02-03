import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './user/roles.decorator';
import { Role } from './common/enums/role.enum';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@Roles(Role.Superuser, Role.User)
  @Public()
  @Get()
  getHello() {
    //console.log(request.user);
    return this.appService.getHello();
  }
}
