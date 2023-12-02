import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from 'express';
import { CreateBrandDto } from "src/common/dto/brand/createBrand.dto";
import { UpdateBrandDto } from "src/common/dto/brand/updateBrand.dto";
import { ResponseService } from "src/common/helpers/response.service";
import { BrandRepository } from "src/common/repositories/brand.repository";

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandRepository)
      private readonly brandRepository: BrandRepository,
    private readonly responseService: ResponseService
  ){}

  async createBrand(res:Response, createBrandInput:CreateBrandDto){
    const name: string = createBrandInput.name.toLowerCase()
    const existingBrand = await this.brandRepository.findOneByName(name)
    if(existingBrand){
        this.responseService.responseNotAcceptable(res ,"Brand Already Exist")
        return 
    }
    
    console.log('do')
    const brandDetail = await this.brandRepository.createBrand(createBrandInput)
    return this.responseService.responseCreated(res, brandDetail , "Brand add successfully")
  }

  async updateBrand(res:Response, brandId: string , updateBrandDto: UpdateBrandDto){
    const existingBrand = await this.brandRepository.findOneById(brandId)
    if(existingBrand){
      let updateBrand = await this.brandRepository.update(brandId , updateBrandDto)

      if(updateBrand && updateBrand.affected > 0 ){
        const resposeData = { ...existingBrand, ...updateBrandDto}
        return this.responseService.responseOk(res, resposeData ,"Brand updated successfully")
      }
      return this.responseService.responseBadRequestWithOutData(res,"Something went wrong")
    }
    return this.responseService.responseNotFound(res,"Brand not found")
  }

  async findAllBrands(res:Response){
    const brandList =  await this.brandRepository.findAll()
    return this.responseService.responseOk(res, brandList , "Get brand list successfully")
  }

  async findBrands(res:Response , brandId: string){
    const brand =  await this.brandRepository.findOneById(brandId)
    return this.responseService.responseOk(res, brand , "Get brand successfully")
  }
  
  async removeBrand(res:Response , brandId: string){
    const brand =  await this.brandRepository.findOneById(brandId)
    if(brand){
      await this.brandRepository.removeBrand(brand)
      return this.responseService.responseOkWithOutData(res,"Delete brand successfully")
    }
    return this.responseService.responseNotFound(res,"Brand Not Found")
  }
}