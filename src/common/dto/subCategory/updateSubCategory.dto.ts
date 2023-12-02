import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Gender } from "src/entities/category.entity"

export class UpdateSubCategoryDto {
    @Optional()
    @ApiProperty()
    name : string

    @Optional()
    @ApiProperty()
    image : string

    @Optional()
    @ApiProperty()
    gender :Gender
}