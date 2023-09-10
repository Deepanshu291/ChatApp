
import swaggerJSDoc,{Options} from 'swagger-jsdoc'

const SwaggerDoc:Options = {
    swaggerDefinition:{
        openapi: '3.0.0',
        info: {
            title: 'Todo API', // Title of your API
            version: '1.0.0', // Version of your API
            description: 'API for managing todos',
        },
         servers: [
    {
      url: 'http://localhost:5500',
      description: 'Development server',
    },

  ],
    },
    apis:["../routes/*.ts"]
}

export const SwaggerSpecs =  swaggerJSDoc(SwaggerDoc)