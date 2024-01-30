import { DefaultSub } from '../../default-sub/entities/default-sub.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => DefaultSub, (defaultSub) => defaultSub.color)
  defaultSub: DefaultSub;

  @BeforeInsert()
  nameLowerCase() {
    this.name.toLowerCase();
  }
}
