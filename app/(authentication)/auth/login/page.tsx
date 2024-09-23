import { LoginForm } from "@/components/forms/Login";
import Image from "next/image";

const LoginPage = ({ searchParams }) => {
  return (
    <div className="flex items-center">
      <div className="w-[50vw] h-[100vh] bg-[#344E41] flex items-center justify-center">
        <Image src="/img/roja-white.svg" alt="logo" width="650" height="250" />
      </div>
      <div className="mx-auto my-auto">
        <LoginForm searchParams={searchParams} />
      </div>
    </div>
  );
};

export default LoginPage;
