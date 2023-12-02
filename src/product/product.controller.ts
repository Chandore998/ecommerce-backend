import { Body, Controller, Get, Param, Post, Put, Query, Res  } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseService } from "src/common/helpers/response.service";

@ApiTags("Product")
@ApiBearerAuth()
@Controller('product')
export class ProductController {
    constructor ( private readonly responseService : ResponseService ){}

   
}