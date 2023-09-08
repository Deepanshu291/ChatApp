

export class CustomError extends Error{
    statusCode!: number;
    constructor({
        message, status
    }:{message?:string, status?:number}){
        super();
        this.message = message || 'Something went Wrong'
        this.statusCode = status || 404
    }
}