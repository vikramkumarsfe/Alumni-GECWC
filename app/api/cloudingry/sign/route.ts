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


