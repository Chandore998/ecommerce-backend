import { Injectable } from "@nestjs/common";
import { Brand } from "src/entities/brand.entity";
import { DataSource, Repository } from "typeorm";
import { UpdateBrandDto } from "../dto/brand/updateBrand.dto";

@Injectable()
export class BrandRepository  extends Repository<Brand> {
    constructor(private dataSource: DataSource) {
        super(Brand, dataSource.createEntityManager());
      }


    async createBrand(createBrandInput){
         return await this.save(createBrandInput);
    }

    async updateBrand(brandId: string,updateBrandInput: UpdateBrandDto){
         return await this.update({ id : brandId }, updateBrandInput);
    }
 
    async findOneById(id : string){
         return await this.findOne({ where : { id }})
    }

    async findOneByName(name : string){
        return await this.findOne({ where : { name }})
    }
    
    async findAll(){
        return await this.find()
    }
    
    async removeBrand(brandDetail){
        return await this.remove(brandDetail)
    }
}