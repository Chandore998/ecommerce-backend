import { Injectable ,Inject} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryDto } from "src/common/dto/category/createCategorydto";
import { UpdateCategoryDto } from "src/common/dto/category/updateCategory.dto";
import { ResponseService } from "src/common/helpers/response.service";
import { CategoryRespository } from "src/common/repositories/category.repository";

Injectable()
export class CategoryService {
    constructor(
      @InjectRepository(CategoryRespository)
      private readonly categoryRepository: CategoryRespository,
      private responseService: ResponseService
    ){}

    async createCategory(createCategoryDto:CreateCategoryDto , transaction){
        return await this.categoryRepository.createCategory(createCategoryDto , transaction)
    }

    async findOneByName(name){
        return await this.categoryRepository.findOneByName(name)
    }

    async findOneById(categoryId){
        return await this.categoryRepository.findOneById(categoryId)
    }

    async updateCategory(categoryId : string , updateCategoryDto:UpdateCategoryDto  , transaction){
        return await this.categoryRepository.updateCategory(categoryId , updateCategoryDto , transaction) 
    }

    async findAllCategory(res){
        const category =  await this.categoryRepository.findAll()
        return this.responseService.responseOk(res, category , "Get all category successfull")
    }


    async findAllCategoryWithCount(){
         return  await this.categoryRepository.findAllWithCounts()
    }

    async findOneCategory(res , categoryId : string){
        const category = await this.categoryRepository.findOneById(categoryId);
        if(category){
            return this.responseService.responseOk(res , category , "Get category successfull")
        }
        return this.responseService.responseNotFound(res, 'Record not found')
    }
}