import { ApiProperty } from '@nestjs/swagger';
import { Roles, UserStatus } from '../ts/enums';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'ID de usuario' })
  @IsString({ message: 'El ID de usuario debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El ID de usuario es obligatorio.' })
  user_ID: string;

  @ApiProperty({ description: 'Nombre del usuario' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres.' })
  name: string;

  @ApiProperty({ description: 'Correo del usuario' })
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  email: string;

  @ApiProperty({ description: 'Celular del usuario' })
  @IsString({ message: 'El número de celular debe ser una cadena.' })
  @Matches(/^3\d{9}$/, {
    message: 'El número de celular debe comenzar con 3 y tener 10 dígitos en total.',
  })
  cellphone: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsString({ message: 'La contraseña debe ser una cadena.' })
  @Length(8, 100, {
    message: 'La contraseña debe tener entre 8 y 50 caracteres.',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número.',
  })
  password: string;

  @IsNumber({}, { message: 'El ID de rol debe ser un número.' })
  @Min(1, { message: 'El ID de rol debe ser mayor o igual a 1.' })
  @Max(3, { message: 'El ID de rol debe ser menor o igual a 3.' }) // ajusta según los roles
  role_ID: number = Roles.USER;

  @IsNumber({}, { message: 'El ID del estado debe ser un número.' })
  @Min(1, { message: 'El ID del estado debe ser mayor o igual a 1.' })
  @Max(3, { message: 'El ID del estado debe ser menor o igual a 3.' }) // ajusta según los roles
  status_ID: number = UserStatus.ACTIVE;

  @IsOptional()
  created_at: Date = new Date();
}