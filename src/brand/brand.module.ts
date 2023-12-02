import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/entities/brand.entity';
import { BrandService } from 'src/common/services/brand/brand.service';
import { BrandRepository } from 'src/common/repositories/brand.repository';
import { ResponseService } from 'src/common/helpers/response.service';
@Module({
    imports:[
        TypeOrmModule.forFeature([Brand])
    ],
    controllers: [BrandController],
    providers: [BrandService,BrandRepository,ResponseService],
}
)
export class BrandModule {}