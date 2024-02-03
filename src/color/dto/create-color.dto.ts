import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateColorDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  id?: number;

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
