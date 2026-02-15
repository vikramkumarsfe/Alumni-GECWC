/**
 * @swagger
 * tags:
 *   - name: Cloudinary
 *     description: Cloudinary secure upload configuration
 */

/**
 * @swagger
 * /api/cloudinary/sign:
 *   get:
 *     summary: Generate Cloudinary signed upload configuration
 *     tags: [Cloudinary]
 *     description: Returns secure signature and upload credentials for uploading profile pictures to Cloudinary.
 *     responses:
 *       200:
 *         description: Cloudinary signed configuration generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 timestamp:
 *                   type: integer
 *                   example: 1710000000
 *                 signature:
 *                   type: string
 *                   example: abc123xyzsignature
 *                 cloudName:
 *                   type: string
 *                   example: your-cloud-name
 *                 apiKey:
 *                   type: string
 *                   example: "123456789012345"
 *       500:
 *         description: Server error
 */


import cloudinary from "@/utils/cloudingry";
import { NextResponse } from "next/server";

export const GET = () =>  {
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      folder : "profile-picture/",
      timestamp,
      transformation: "c_fill,w_400,h_400",
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
}


