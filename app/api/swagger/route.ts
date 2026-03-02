/**
 * @swagger
 * tags:
 *   - name: Documentation
 *     description: API documentation endpoints
 */

/**
 * @swagger
 * /api/swagger:
 *   get:
 *     summary: Get OpenAPI specification (Swagger JSON)
 *     tags: [Documentation]
 *     description: Returns the generated OpenAPI JSON specification used by Swagger UI.
 *     responses:
 *       200:
 *         description: OpenAPI specification returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */


import { NextResponse } from "next/server";
import swaggerSpec from "@/lib/swagger";

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
