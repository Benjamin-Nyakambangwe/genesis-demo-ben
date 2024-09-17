// import React, { useState } from "react";
// import { cn } from "@/lib/utils";
// import { login, updateAccess } from "@/lib/auth";
// import { redirect } from "next/navigation";

// import Link from "next/link";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export function LoginForm() {
//   // const router = useRouter();

//   return (
//     <>
//       <Card className="mx-auto max-w-sm">
//         <CardHeader>
//           <CardTitle className="text-2xl">Login</CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form
//             className="my-8"
//             action={async (formData) => {
//               "use server";
//               const result = await login(formData);
//               if (result.success) {
//                 redirect("/");
//               } else {
//                 console.error(result.error);
//               }
//             }}
//           >
//             <div className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   name="email"
//                   placeholder="m@example.com"
//                   required
//                   className="focus-visible:ring-red-600 focus:border-0"
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex items-center">
//                   <Label htmlFor="password">Password</Label>
//                   <Link
//                     href="#"
//                     className="ml-auto inline-block text-sm underline"
//                   >
//                     {/* Forgot your password? */}
//                   </Link>
//                 </div>
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   className="focus-visible:ring-red-600 focus:border-0"
//                 />
//               </div>
//               <Button type="submit" className="w-full bg-red-600">
//                 Login
//               </Button>
//               {/* <Button variant="outline" className="w-full">
//                 Login with Google
//               </Button> */}
//             </div>
//             <div className="mt-4 text-center text-sm">
//               Don&apos;t have an account?{" "}
//               <Link
//                 href="/auth/register"
//                 className="underline text-red-600 font-bold"
//               >
//                 Sign up
//               </Link>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </>
//   );
// }

import React from "react";
import { login } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginForm = async () => {
  async function handleSubmit(formData) {
    "use server"; // Marks this function as a server action
    const result = await login(formData);
    if (result.success) {
      console.log(result);
      return redirect("/"); // Server-side redirect
    } else {
      console.error(result.error);
      return result.error; // You can return an error message to show in the UI
    }
  }

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="my-8">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  className="focus-visible:ring-red-600 focus:border-0"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="focus-visible:ring-red-600 focus:border-0"
                />
              </div>
              <Button type="submit" className="w-full bg-red-600">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="underline text-red-600 font-bold"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
