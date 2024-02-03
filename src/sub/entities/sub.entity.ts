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

  @Column('text', {
    unique: true,
  })
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

  @BeforeInsert()
  checkFields() {
    this.name = this.name.trim();
    this.email = this.email.toLowerCase().trim();
    this.password = this.password.trim();
  }
}
