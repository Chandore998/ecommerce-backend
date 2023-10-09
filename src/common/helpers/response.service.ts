import { Response } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {

    responseOk(res : Response , data , message ){
        const responseData = {
            status : 200,
            data,
            message
        }
     res.status(200).send(responseData)
    }

    responseBadRequestWithOutData(res : Response , message ){
        const responseData = {
            status : 400,
            message
        }
     res.status(400).send(responseData)
    }

    
}