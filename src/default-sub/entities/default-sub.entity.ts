import { Color } from '../../color/entities/color.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => Color, (color) => color.defaultSub, { cascade: true })
  color: Color;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.name;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' +', '')
      .replaceAll("'", '')
      .replaceAll(' ', '_');
  }

  @BeforeInsert()
  createLogo() {
    if (!this.logo) {
      const palabras = this.name.split(' ');
      let iniciales = '';

      for (let i = 0; i < Math.min(2, palabras.length); i++) {
        iniciales += palabras[i].charAt(0);
      }

      this.logo = iniciales.toUpperCase();
    }
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' +', '')
      .replaceAll("'", '')
      .replaceAll(' ', '_');
  }
}
