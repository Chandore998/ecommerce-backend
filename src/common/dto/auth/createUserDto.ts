import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    fullname : string

    @ApiProperty()
    @IsEmail({}, { message : 'Invalid Email Format'})
    email : string

    @ApiProperty()
    password : string
}