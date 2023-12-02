import { ApiProperty } from "@nestjs/swagger";

export class Qrcode {
    
    @ApiProperty()
    code : string

    @ApiProperty()
    secret :string
    
}