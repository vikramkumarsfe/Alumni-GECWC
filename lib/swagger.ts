import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Alumni Management API",
      version: "1.0.0",
      description: "Complete API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  // IMPORTANT: Correct path for App Router
  apis: ["./app/api/**/route.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
