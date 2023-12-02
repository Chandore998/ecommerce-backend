import { Body, Controller, Get, Post, Put, Query, Res } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { CreateCategoryDto } from "src/common/dto/category/createCategorydto";
import { CreateSubCategoryDto } from "src/common/dto/subCategory/createSubCategorydto";
import { UpdateSubCategoryDto } from "src/common/dto/subCategory/updateSubCategory.dto";
import { ResponseService } from "src/common/helpers/response.service";
import { SubCategoryService } from "src/common/services/subCategory/subCategory.service";

@ApiTags("SubCategory")
@Controller('admin/subCategory')
export class SubCategoryController {
    constructor(
        private readonly subCategoryService : SubCategoryService,
        private readonly responseService : ResponseService,
    ){}

    @Post('/')
    @ApiBody({ type : CreateCategoryDto , required : true })
    @ApiResponse({ status: 201, description: 'Sub-Category add successfully' })
    @ApiResponse({ status: 406, description: 'Sub-Category already exist' })
    @ApiResponse({ status: 400, description: 'Something went wrong' })
    @ApiResponse({ status: 500, description: 'Internal Server error' })
    async createSubCategory (
        @Res() res : Response,
        @Body() createSubCategoryDto : CreateSubCategoryDto
        ){
        try
        {
         await this.subCategoryService.createSubCategory(res, createSubCategoryDto)
        }
        catch(error){
            return this.responseService.responseIntervalServer(res) 
        }
    }
    

    @Put('/:subCategoryId')
    async updateSubCategory (
        @Res() res : Response,
        @Body() updateSubCategoryDto : UpdateSubCategoryDto,
        @Query() subCategoryId : string )
    {
        try
        {
         return await this.subCategoryService.updateSubCategory(res , subCategoryId , updateSubCategoryDto)
        }
        catch(error){
            return this.responseService.responseIntervalServer(res) 
        }
    }

    @Get('/')
    async getAllSubCategory(@Res() res : Response){
        try
        {
         return await this.subCategoryService.findAllSubCategory(res)
        }
        catch(error){
            return this.responseService.responseIntervalServer(res) 
        }
    }

    @Get('/:subCategoryId')
    async getSubCategory (
         @Query() subCategoryId : string,
         @Res() res : Response 
         ){
        try
        {
         return await this.subCategoryService.findOneSubCategory(res ,subCategoryId)
        }
        catch(error){
            return this.responseService.responseIntervalServer(res) 
        }
    }

}