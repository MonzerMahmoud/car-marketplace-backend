import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDTO: Record<string, any>) {
    return this.authService.signIn(signInDTO.username, signInDTO.password);
  }

  @Public()
  @Post('register')
  signUp(@Body() signUpDTO: SignUpDto) {
    return this.authService.signUp(signUpDTO);
  }
}
