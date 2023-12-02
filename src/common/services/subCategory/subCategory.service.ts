import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSubCategoryDto } from "src/common/dto/subCategory/createSubCategorydto";
import { UpdateSubCategoryDto } from "src/common/dto/subCategory/updateSubCategory.dto";
import { ResponseService } from "src/common/helpers/response.service";
import { SubCategoryRespository } from "src/common/repositories/subCategory.repository";

Injectable()
export class SubCategoryService {
    constructor(
        @InjectRepository(SubCategoryRespository)
        private readonly subCategoryRespository: SubCategoryRespository,
        private readonly responseService: ResponseService
    ){}

    async createSubCategory(res ,createSubCategoryDto:CreateSubCategoryDto){
        const existingSubCategory  = await this.subCategoryRespository.findOneByName(createSubCategoryDto.name)
        if(existingSubCategory){
             this.responseService.responseNotAcceptable(res ,"Sub-Category Already Exist")
             return 
        }
        const subCategory = await this.subCategoryRespository.create(createSubCategoryDto)
        return this.responseService.responseCreated(res ,subCategory,'Sub-Category added successfully' )
    }

    async updateSubCategory(res , subCategoryId : string , updateSubCategoryDto:UpdateSubCategoryDto){
        const existingSubCategory  = await this.subCategoryRespository.findOneById(subCategoryId)
        if(existingSubCategory){
            const subCategory = await this.subCategoryRespository.update( subCategoryId , updateSubCategoryDto) 
            if(subCategory && subCategory.affected > 0 ){
                const updateCategory  = { ...existingSubCategory , ...updateSubCategoryDto}
                return this.responseService.responseOk(res,updateCategory,"Sub-Category updated successfully")
            }
            return this.responseService.responseBadRequestWithOutData(res,"Something went wrong")
        }
        return this.responseService.responseNotFound(res, "Not found");
    }

    async findAllSubCategory(res){
        const subCategory =  await this.subCategoryRespository.findAll()
        return this.responseService.responseOk(res, subCategory , "Get all Sub Category successfull")
    }

    async findOneSubCategory(res , subCategoryId : string){
        const subCategory = await this.subCategoryRespository.findOneById(subCategoryId);
        if(subCategory){
            return this.responseService.responseOk(res , subCategory , "Get Sub Category successfull")
        }
        return this.responseService.responseNotFound(res, 'Record not found')
    }
}