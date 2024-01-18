import { Express, Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options: swaggerJsDoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Meta Game Payment Gateway API Docs',
        version:'1.0.0',
      },
      components: {
        securitySchemas: {
          bearerAuth: {
            type: 'http',
            schema: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./routes/paymentUrl.route/*.ts'],
  };

  const swaggerSpec = swaggerJsDoc(options);

  function swaggerDocs(app: Express, port: number) {
    // Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
    // Docs in JSON format
    app.get('docs.json', (req, res, next) => {
      res.setHeader('Content-Type', 'application/json');
      res.send();
    });
  
    console.log(`Docs available at http://localhost:${port}/docs`);
  }
  
  export default swaggerDocs;