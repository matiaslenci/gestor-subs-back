import { IsIn, IsString, MinLength } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @IsIn(['rojo', 'azul', 'gris', 'rosa', 'verde', 'morado', 'amarillo'])
  name: string;
}
