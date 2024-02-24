import { User } from '../../auth/entities/user.entity';
import { Color } from '../../color/entities/color.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  logo: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column('text', { nullable: true })
  expiration: string;

  @Column('text', { nullable: true })
  email: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('int', {
    default: 5,
  })
  colorId: number;

  @ManyToOne(() => Color, (color) => color.sub)
  color: Color;

  @ManyToOne(() => User, (user) => user.sub, { eager: true })
  user: User;

  @BeforeInsert()
  checkFields() {
    this.name = this.name.trim();

    if (this.email) this.email = this.email.toLowerCase().trim();

    if (this.password) this.password = this.password.trim();
  }
}
