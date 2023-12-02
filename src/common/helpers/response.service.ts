import { Response } from 'express';
import { HttpStatus, Injectable } from '@nestjs/common';


@Injectable()
export class ResponseService {
    constructor(){}

    responseOk(res : Response , data , message ){
        const responseData = {
            status : HttpStatus.OK,
            data,
            message
        }
     return res.status(HttpStatus.OK).send(responseData)
    }

    responseOkWithOutData(res : Response , message ){
        const responseData = {
            status : HttpStatus.OK,
            message
        }
     res.status(HttpStatus.OK).send(responseData)
    }

    responseCreated(res : Response , data , message ){
        const responseData = {
            status : HttpStatus.CREATED,
            data,
            message
        }
     res.status(HttpStatus.CREATED).send(responseData)
    }

    responseBadRequestWithOutData(res : Response , message ){
        const responseData = {
            status : HttpStatus.BAD_REQUEST,
            message
        }
     res.status(HttpStatus.BAD_REQUEST).send(responseData)
    }

    responseIntervalServer(res : Response ){
        const responseData = {
            status : HttpStatus.INTERNAL_SERVER_ERROR,
            message : "Internal Server error"
        }
     res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(responseData)
    }

    responseNotAcceptable(res : Response , message ){
        const responseData = {
            status : HttpStatus.NOT_ACCEPTABLE,
            message 
        }
     res.status(HttpStatus.NOT_ACCEPTABLE).send(responseData)
    }

    responseNotFound(res , message ){
        const responseData = {
            status : HttpStatus.NOT_FOUND,
            message 
        }
     res.status(HttpStatus.NOT_FOUND).send(responseData)
    }

    
}