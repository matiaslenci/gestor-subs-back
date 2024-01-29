import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Sub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  logo: string;

  @Column('float')
  price: number;

  @Column('datetime')
  expiration: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;
}
