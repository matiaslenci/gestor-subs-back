import { IsIn, IsString } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @IsIn([
    'rojo',
    'azul',
    'gris',
    'rosa',
    'verde',
    'morado',
    'amarillo',
    'naranja',
  ])
  name: string;
}
