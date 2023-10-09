import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brand } from "src/entities/brand.entity";
import { Repository } from "typeorm";

@Injectable()
export class BrandRepository {
    constructor(
        @InjectRepository(Brand) private brandRepository :Repository<Brand>
    ){}

    async create(createBrandInput){
         const brand =  this.brandRepository.create(createBrandInput)
         return await this.brandRepository.save(brand);
    }

    async update(updateBrandInput){
         return await this.brandRepository.save(updateBrandInput);
    }

    async findOne(id : string){
         return await this.brandRepository.findOne({ where : { id }})
    }
    
    async findAll(id : string){
        return await this.brandRepository.find()
    }
    async remove(brandDetail){
        return await this.brandRepository.remove(brandDetail)
    }
}