import { Module } from "@nestjs/common";
import { ResponseService } from "src/common/helpers/response.service";
import { SubCategoryController } from "./subCategory.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubCategory } from "src/entities/subCategory.entity";
import { SubCategoryRespository } from "src/common/repositories/subCategory.repository";
import { SubCategoryService } from "src/common/services/subCategory/subCategory.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([SubCategory])
    ],
    controllers :[SubCategoryController],
    providers:[ SubCategoryRespository,SubCategoryService , ResponseService ]
})
export class SubCategoryModule {}