import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    fullName : string

    @IsEmail()
    @ApiProperty()
    email : string

    @ApiProperty()
    password : string

}