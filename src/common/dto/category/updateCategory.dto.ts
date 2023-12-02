import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Gender } from "src/entities/category.entity"

export class UpdateCategoryDto {
    @Optional()
    @ApiProperty()
    name : string

    @Optional()
    @ApiProperty()
    gender :Gender
}