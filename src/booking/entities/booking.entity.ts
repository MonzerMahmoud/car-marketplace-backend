import { Car } from 'src/car/entities/car.entity';
import { BookingStatus } from 'src/common/enums/booking-status.enum';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: BookingStatus.Pending })
  bookingStatus: string;

  @CreateDateColumn()
  startDate: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Car, (car) => car.id)
  @JoinColumn()
  car: Car;
}
