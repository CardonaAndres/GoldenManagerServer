import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StoreStatus } from '../ts/enums';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  MinLength,
  MaxLength,
  IsInt,
} from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({
    example: 'Tienda de Ropa XYZ',
    description: 'Nombre de la tienda',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(100, { message: 'El nombre no debe superar los 100 caracteres.' })
  name: string;

  @ApiProperty({
    example: 'Tienda especializada en ropa urbana y casual.',
    description: 'Descripción breve de la tienda',
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción es obligatoria.' })
  @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres.' })
  @MaxLength(300, { message: 'La descripción no debe superar los 300 caracteres.' })
  description: string;

  @ApiProperty({
    example: 'Calle Falsa 123, Ciudad Gótica',
    description: 'Ubicación física de la tienda',
  })
  @IsString({ message: 'La ubicación debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La ubicación es obligatoria.' })
  @MinLength(5, { message: 'La ubicación debe tener al menos 5 caracteres.' })
  @MaxLength(200, { message: 'La ubicación no debe superar los 200 caracteres.' })
  location: string;

  @ApiProperty({
    example: 1,
    description: 'ID del estado de la tienda (por ejemplo: 1 = activa, 2 = inactiva)',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'El estado debe ser un número.' })
  @IsInt({ message: 'El estado debe ser un número entero.' })
  status_ID: number = StoreStatus.PENDING;

  @ApiProperty({
    example: 'logo123.jpg',
    description: 'Nombre del archivo del logo subido',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El logo debe ser una cadena de texto.' })
  logo_url?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID del usuario dueño de la tienda',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El ID del dueño debe ser una cadena de texto.' })
  user_owner_ID?: string;
}
