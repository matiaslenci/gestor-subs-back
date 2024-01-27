import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    default: 'gris',
  })
  name: string;

  @BeforeInsert()
  nameLowerCase() {
    this.name.toLowerCase();
  }
}
