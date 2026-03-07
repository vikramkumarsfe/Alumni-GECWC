"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { message, Skeleton } from "antd";
import { useSession } from "next-auth/react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ProfileImageUpload from "./ProfileImageUpload";

const profileSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters."),
  mobile: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number."),
  bio: z.string().max(160, "Bio must be under 160 characters.").optional(),
  batch: z.number().min(2019),
  branch: z.string().min(2, "Branch at least 2 characters"),

  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pincode: z.string().regex(/^[0-9]{6}$/, "Enter valid pincode"),
  })
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function AlumniEditForm() {
  const { data: session, status, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: "",
      mobile: "",
      bio: "",
      batch: 2019,
      branch: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
      }
    }
  });

  // Prefill form when session loads
  useEffect(() => {
    if (session?.user) {
      form.reset({
        fullname: session.user.name || "",
        mobile: (session.user as any).mobile || "",
        bio: (session.user as any).bio || "",
        batch: (session.user as any).batch || 2019,
        branch: (session.user as any).branch || "",
        address: {
          street: (session.user as any).address?.street || "",
          city: (session.user as any).address?.city || "",
          state: (session.user as any).address?.state || "",
          country: (session.user as any).address?.country || "",
          pincode: (session.user as any).address?.pincode || ""
        }
      });
    }
  }, [session, form]);

  if (status === "loading") {
    return <Skeleton active />;
  }

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    try {
      await axios.put("/api/alumni", data);

      await update({
        name: data.fullname,
        bio: data.bio,
        mobile: data.mobile,
        batch : data.batch,
        branch : data.branch,
        address : data.address
      });

      message.success("Profile updated successfully!");
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto border-none shadow-lg md:border md:shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Edit Profile
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* Profile Image Upload */}
            <div className="flex justify-center pb-4">
              <ProfileImageUpload
                  image={session?.user?.image ?? undefined}
                  name={form.watch("fullname")}
                />

            </div>

            <div className="grid gap-6">
              <div className="grid md:grid-cols-2  gap-4 w-full">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2  gap-4 w-full">

              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch</FormLabel>
                    <FormControl>
                      <Input placeholder="2022" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <Input placeholder="Computer Science and Engineering(Cyber Security)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>

              <div className="grid  gap-4">
                <h1 className="text-lg font-sm span-2">Address : </h1>
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input placeholder="700001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              </div>

            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="ghost"
                type="button"
                onClick={() => form.reset()}
              >
                Reset
              </Button>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
