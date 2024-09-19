import "@/app/globals.css";
import { Raleway as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthChecker } from "@/components/AuthChecker";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = cookies();
  const token = cookieStore.get("access")?.value;
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthChecker />
        <Header token={token} />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
