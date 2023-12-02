
import { Module } from "@nestjs/common";

import { ResponseService } from "src/common/helpers/response.service";
import { ProductController } from "./product.controller";

@Module({
    // imports:[
    //     TypeOrmModule.forFeature([ Product ])
    // ],
    providers:[ ProductController, ResponseService ]
})
export class ProductModule {}

