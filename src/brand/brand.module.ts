import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/entities/brand.entity';
@Module({
    imports:[
        TypeOrmModule.forFeature([Brand])
    ],
    controllers: [BrandController],
    providers: [],
}
)
export class BrandModule {}