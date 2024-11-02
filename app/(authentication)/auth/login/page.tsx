import { LoginForm } from "@/components/forms/Login";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface LoginPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: "Login | RO-JA Properties",
  description: "Login to your RO-JA Properties account.",
};

const LoginPage = ({ searchParams }: LoginPageProps) => {
  return (
    <div className="flex items-center">
      <div className="w-[10vh] sm:w-[50vw] h-[100vh] bg-[#344E41] flex items-center justify-center">
        <div className="rotate-90 sm:rotate-0 transform transition-transform duration-300">
          <Link href="/">
            <Image
              src="/img/roja-white.svg"
              alt="logo"
              width={650}
              height={250}
              className="w-auto h-auto"
            />
          </Link>
        </div>
      </div>
      <div className="mx-auto my-auto">
        <LoginForm searchParams={searchParams} />
      </div>
    </div>
  );
};

export default LoginPage;
