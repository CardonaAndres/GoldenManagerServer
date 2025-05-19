import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ description : 'Nombre de la categoria' })
    @IsNotEmpty({ message : 'El valor no puede ser nulo' })
    @IsString({ message : 'La categoria debe ser un string' })
    category : string
}
