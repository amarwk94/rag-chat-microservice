import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RAG Chat Microservice",
      version: "1.0.0",
      description: "API documentation for the RAG chat storage microservice",
      contact: {
        name: "Amar Waheed Kazi",
        email: "amarwk94@gmail.com",
      },
    },
    servers: [{ url: "http://localhost:5000" }],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
    },
    security: [{ ApiKeyAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
