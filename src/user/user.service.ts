import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async findOneById(id: number): Promise<User | undefined> {
    const result = this.userRepository.findOneBy({ id });
    if (!result) {
      throw new Error('User not found');
    }
    return result;
  }

  async create(
    username: string,
    password: string,
    role: number,
  ): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    user.role = role;

    return this.userRepository.save(user);
  }
}
