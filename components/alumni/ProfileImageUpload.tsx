"use client";

import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";

interface Props {
  image?: string;
  name?: string;
}

export default function ProfileImageUpload({ image, name = "User" }: Props) {
  const { update } = useSession();

  const cloudinaryUrl = image
    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${image}.jpg`
    : undefined;

  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

    console.log("Cloud name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)

  return (
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/sign"
        options={{
          cropping: true,
          multiple: false,
          resourceType: "image",
        }}
        onSuccess={async (res: any) => {
          const key = res.info.public_id;

          await axios.post("/api/user/profile-image", {
            provider: "cloudinary",
            key,
          });

          await update({ image: key });
        }}
      >



      {({ open }) => (
        <div
          onClick={() => open()}
          className="relative cursor-pointer group"
        >
          <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
            <AvatarImage
              src={cloudinaryUrl}
              alt={name}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl bg-muted">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Pencil className="w-6 h-6" />
          </div>
        </div>
      )}
    </CldUploadWidget>
  );
}
