import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UpdateSubCategoryDto } from "../dto/subCategory/updateSubCategory.dto";
import { SubCategory } from "src/entities/subCategory.entity";
import { CreateSubCategoryDto } from "../dto/subCategory/createSubCategorydto";

@Injectable()
export class SubCategoryRespository extends Repository<SubCategory> {
    constructor(private dataSource: DataSource) {
        super(SubCategory, dataSource.createEntityManager());
      }

    async createSubCategory(createSubCategoryDto:CreateSubCategoryDto){
        const createdSubCategory = this.create(createSubCategoryDto);
        return await this.save(createdSubCategory) 
    }

    async updateSubCategory(subCategoryId : string, updatesubCategoryDto: UpdateSubCategoryDto){
        return await this.update({ id : subCategoryId }, updatesubCategoryDto)
    }

    async findAll(){
        return await this.find();
    }

    async findOneById(subCategoryId : string ){
        return await this.findOne({ where : { id : subCategoryId } })
    }

    async findOneByName(subCategoryName : string ){
        return await this.findOne({ where : { name  : subCategoryName } })
    }


    
}