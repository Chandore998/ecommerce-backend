import { Injectable } from "@nestjs/common";
import { Category } from "src/entities/category.entity";
import { DataSource, Repository } from "typeorm";
import { UpdateCategoryDto } from "../dto/category/updateCategory.dto";
import { CreateCategoryDto } from "../dto/category/createCategorydto";

@Injectable()
export class CategoryRespository extends Repository<Category> {
    constructor(private dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
      }

    async createCategory(createCategoryDto:CreateCategoryDto, transaction = null){
        const createdCategory = this.create(createCategoryDto);
        if(transaction){
            await transaction.save(Category, createdCategory)
        }
        return await this.save(createdCategory) 
    }

    async updateCategory(condition , data:UpdateCategoryDto ,  transaction = null){
        if(transaction){
            return await transaction.update(Category , condition , data )
        }
        return await this.update(condition, data)
    }

    async findAll(){
        return await this.find();
    }

   async findAllWithCounts(){
        return await 
        this.createQueryBuilder().
        select([
            "Category.id",
            `(select count(*) from "subCategory" where "subCategory"."categoryId" = "category"."id") as "totalSub"`
        ]).getManyAndCount()
    }

    async findOneById(categoryId : string ){
        return await this.findOne({ where : { id : categoryId } })
    }

    async findOneByName(categoryName : string ){
        return await this.findOne({ where : { name  : categoryName } })
    }

}