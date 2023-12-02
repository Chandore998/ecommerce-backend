import { Body, Controller, Delete, Get, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { AuthLocalGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/role.decorator";
import { RoleGuard } from "src/auth/role.guard";
import { CreateBrandDto } from "src/common/dto/brand/createBrand.dto";
import { UpdateBrandDto } from "src/common/dto/brand/updateBrand.dto";
import { ResponseService } from "src/common/helpers/response.service";
import { BrandService } from "src/common/services/brand/brand.service";

@ApiBearerAuth()
@ApiTags("Brand")
@UseGuards(AuthLocalGuard,RoleGuard)
@Controller('admin/brand')
export class BrandController {
    constructor(
        private readonly brandService: BrandService,
        private readonly responseService : ResponseService,
    ){}


    @Post("/")
    @ApiBody({ type : CreateBrandDto, required : true })
    @ApiResponse({ status: 201, description: 'Brand add successfully' })
    @ApiResponse({ status: 406, description: 'Brand already exist' })
    @ApiResponse({ status: 400, description: 'Something went wrong' })
    @ApiResponse({ status: 500, description: 'Internal Server error' })
    async createBrand(
        @Body() createBrandDto : CreateBrandDto,
        @Res() res : Response

    ){
        try{





           return await this.brandService.createBrand(res,createBrandDto)
        }catch(error){
            return this.responseService.responseIntervalServer(res)
        }
    }


    @Put("/:brandId")
    @ApiQuery({ name: 'brandId'})
    @ApiBody({ type : UpdateBrandDto ,required : true })
    @ApiResponse({ status: 201, description: 'Brand add successfully' })
    @ApiResponse({ status: 406, description: 'Brand already exist' })
    @ApiResponse({ status: 400, description: 'Something went wrong' })
    @ApiResponse({ status: 500, description: 'Internal Server error' })
    async updateBrand(
        @Query("brandId") brandId : string,
        @Body() updateBrandDto : UpdateBrandDto,
        @Res() res : Response
    ){
        try {
           return await this.brandService.updateBrand(res, brandId, updateBrandDto)
        }
        catch(error){
            return this.responseService.responseIntervalServer(res)
        }
    }


    @Get("/")
    @ApiResponse({ status: 200, description: 'Get brand list successfully' })
    @ApiResponse({ status: 400, description: 'Something went wrong' })
    @ApiResponse({ status: 500, description: 'Internal Server error' })
    async getAllBrand(@Res() res : Response){
        try {
           return await this.brandService.findAllBrands(res)
        }



        
        catch(error){
            return this.responseService.responseIntervalServer(res)
        }
    }

    @Get("/:brandId")
    @ApiQuery({ name : 'brandId' })
    @ApiResponse({ status: 200, description: 'Get brand successfully"' })
    @ApiResponse({ status: 400, description: 'Something went wrong' })
    @ApiResponse({ status: 500, description: 'Internal Server error' })
    async getBrand(
        @Query("brandId") brandId : string,
        @Res() res : Response
        ){
        try {
           return await this.brandService.findBrands(res,brandId)
        }
        catch(error){
            return this.responseService.responseIntervalServer(res)
        }
    }


    @Delete("/:brandId")
    @ApiQuery({ name : 'brandId' })
    @ApiResponse({ status: 200, description: 'Delete brand successfully' })
    @ApiResponse({ status: 404, description: 'Brand Not Found' })
    @ApiResponse({ status: 400, description: 'Something went wrong' })
    @ApiResponse({ status: 500, description: 'Internal Server error' })
    async removeBrand(
        @Query("brandId") brandId : string,
        @Res() res : Response
        ){
        try {
           return await this.brandService.removeBrand(res,brandId)
        }
        catch(error){
            return this.responseService.responseIntervalServer(res)
        }
    }

    
}