import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "src/entities/category.entity";

export class CreateCategoryDto {
    
    @ApiProperty()
    name : string

    @ApiProperty()
    gender :Gender
    
}