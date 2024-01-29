import { DefaultSub } from '../../default-sub/entities/default-sub.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    default: 'gris',
  })
  name: string;

  @ManyToOne(() => DefaultSub, (defaultSub) => defaultSub.color)
  defaultSub: DefaultSub;

  @BeforeInsert()
  nameLowerCase() {
    this.name.toLowerCase();
  }
}
