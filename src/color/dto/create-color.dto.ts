import { IsIn, IsString, MinLength } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @MinLength(1)
  @IsIn(['rojo', 'azul', 'gris', 'rosa', 'verde', 'morado', 'amarillo'])
  name: string;
}
