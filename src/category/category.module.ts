import { Module } from "@nestjs/common";

import { ResponseService } from "src/common/helpers/response.service";
import { CategoryRespository } from "src/common/repositories/category.repository";
import { CategoryService } from "src/common/services/category/category.service";
import { CategoryController } from "./category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([ Category ])
    ],
    controllers :[CategoryController],
    providers:[ CategoryService,CategoryRespository, ResponseService ]
})
export class CategoryModule {}