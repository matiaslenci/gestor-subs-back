import { Sub } from '../../sub/entities/sub.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('text')
  avatar: string;

  @Column('bool', {
    default: true,
  }) // Postgres utiliza bool
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(() => Sub, (sub) => sub.user)
  sub: Sub;

  @BeforeInsert()
  createAvatar() {
    if (!this.avatar) {
      const palabras = this.fullName.split(' ');
      let iniciales = '';

      for (let i = 0; i < Math.min(2, palabras.length); i++) {
        iniciales += palabras[i].charAt(0);
      }

      this.avatar = iniciales.toUpperCase();
    }
  }

  @BeforeInsert()
  checkFields() {
    this.email = this.email.toLowerCase().trim();
    this.fullName = this.fullName.toLowerCase().trim();
    this.avatar = this.avatar.toLowerCase().trim();
    this.password = this.password.trim();
  }

  @BeforeUpdate()
  checkFieldsUpdate() {
    this.checkFields();
    this.createAvatar();
  }
}
