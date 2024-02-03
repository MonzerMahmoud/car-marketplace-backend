import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  color: string;

  @Column()
  price: number;

  @Column({ default: false })
  isBooked: boolean;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
