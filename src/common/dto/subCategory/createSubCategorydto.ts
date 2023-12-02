import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "src/entities/category.entity";

export class CreateSubCategoryDto {
    @ApiProperty()
    name : string

    @ApiProperty()
    image : string

    @ApiProperty()
    gender :Gender
    
}