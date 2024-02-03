import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.username,
        role: user.role,
      },
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userService.findOne(signUpDto.username);
    if (user) {
      return { message: 'user already exists' };
    }

    const newUser = await this.userService.create(
      signUpDto.username,
      signUpDto.password,
      2,
    );

    const payload = {
      sub: newUser.id,
      username: newUser.username,
      role: newUser.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.username,
        role: user.role,
      },
    };
  }
}
