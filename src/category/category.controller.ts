import { Body, Controller, Get, Param, Post, Put, Query, Res  } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { CreateCategoryDto } from "src/common/dto/category/createCategorydto";
import { UpdateCategoryDto } from "src/common/dto/category/updateCategory.dto";
import { ResponseService } from "src/common/helpers/response.service";
import { CategoryService } from "src/common/services/category/category.service";
import { DatabaseSource } from "typeorm.postgres.config";

@ApiBearerAuth()
@ApiTags("Category")
@Controller('admin/category')
export class CategoryController {
    constructor(
        private categoryService : CategoryService,
        private readonly responseService : ResponseService,
    ){}

    @Post('/')
    @ApiBody({ type : CreateCategoryDto , required : true })
    @ApiResponse({ status: 201, description: 'Category add successfully' })
    @ApiResponse({ status: 406, description: 'Category already exist' })
    @ApiResponse({ status: 400, description: 'Something went wrong' })
    @ApiResponse({ status: 500, description: 'Internal Server error' })
    async createCategory( @Res() res : Response, @Body() createCategoryDto : CreateCategoryDto )
    {
    try
        {
        const existingCategory  = await this.categoryService.findOneByName(createCategoryDto.name)
        if(existingCategory){
            return this.responseService.responseNotAcceptable(res ,"Category Already Exist") 
        }

        const category = await DatabaseSource.transaction(async (transaction) =>{
            return await this.categoryService.createCategory(createCategoryDto,transaction)
        })

        if(category){
            return this.responseService.responseCreated(res ,category,'Category added successfully' )
        }

        return this.responseService.responseBadRequestWithOutData(res ,"Something went wrong");
        }
    catch(error) 
        {
        return this.responseService.responseIntervalServer(res)
        }
    }
    

    @Put('/:categoryId')
    @ApiParam({ name : "categoryId" , type : String , description :"Enter category Id to get category detail"})
    @ApiResponse({ status: 200, description: 'Category updated successfully' })
    @ApiResponse({ status: 400, description: 'Something went wrong' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 500, description: 'Internal Server error' })
    async updateCategory ( @Res() res : Response, @Body() updateCategoryDto : UpdateCategoryDto, @Param("categoryId") categoryId : string )
    {
    try
        {
        const existingCategory = await this.categoryService.findOneById(categoryId)
        if(!existingCategory){
            return this.responseService.responseNotFound(res, "Not found");
        }

        const updateCategory = await DatabaseSource.transaction( async (transaction) =>{
                const category = await this.categoryService.updateCategory( categoryId , updateCategoryDto , transaction)
                if(category && category.affected > 0 ){
                return updateCategoryDto
                }
        })
          
        if(updateCategory){
            return this.responseService.responseOk(res,updateCategory,"Category updated successfully")
        }
        return this.responseService.responseBadRequestWithOutData(res,"Something went wrong")
        }
        catch(error){
            return this.responseService.responseIntervalServer(res) 
        }
    }

    @Get('/')
    @ApiResponse({ status: 201, description: 'Category add successfully' })
    @ApiResponse({ status: 406, description: 'Category already exist' })
    @ApiResponse({ status: 400, description: 'Something went wrong' })
    @ApiResponse({ status: 500, description: 'Internal Server error' })
    async getAllCategory(@Res() res : Response){
        try
        {

         return await this.categoryService.findAllCategoryWithCount()
        }
        catch(error){
            return this.responseService.responseIntervalServer(res) 
        }
    }


    @Get('/:categoryId')
    @ApiBody({ type : CreateCategoryDto , required : true })
    @ApiResponse({ status: 201, description: 'Category add successfully' })
    @ApiResponse({ status: 406, description: 'Category already exist' })
    @ApiResponse({ status: 400, description: 'Something went wrong' })
    @ApiResponse({ status: 500, description: 'Internal Server error' })
    async getCategory (
         @Query() categoryId : string,
         @Res() res : Response 
         ){
        try
        {
         return await this.categoryService.findOneCategory(res ,categoryId)
        }
        catch(error){
            return this.responseService.responseIntervalServer(res) 
        }
    }

}