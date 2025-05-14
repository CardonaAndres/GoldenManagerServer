import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, Matches } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty({ description: 'Correo del usuario' })
    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    email : string;

    @ApiProperty({ description: 'Contraseña del usuario' })
    @IsString({ message: 'La contraseña debe ser una cadena.' })
    @Length(8, 100, {
    message: 'La contraseña debe tener entre 8 y 50 caracteres.',
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
        'La contraseña debe contener al menos una mayúscula, una minúscula y un número.',
    })
    newPassword : string;
}