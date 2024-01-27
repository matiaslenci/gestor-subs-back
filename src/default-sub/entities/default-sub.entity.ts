import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DefaultSub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  logo: string;

  @Column('text', {
    unique: true,
  })
  slug: string;
}
