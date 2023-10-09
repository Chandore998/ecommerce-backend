import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Brand")
@Controller('admin/brand')
export class BrandController {
    constructor(){}


    @Post("/add")
    // @ApiBody({ type :  ,required : true })
    @ApiResponse({ status: 201, description: 'Signup user successfully' })
    @ApiResponse({ status: 400, description: 'Something went wrong' })
    @ApiResponse({ status: 500, description: 'Internal Server error' })
    async createBrand(){
        try{
            
        }catch(error){

        }
    }
}