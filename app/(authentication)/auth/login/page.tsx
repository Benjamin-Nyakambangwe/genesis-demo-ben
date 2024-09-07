import { LoginForm } from "@/components/forms/Login";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="flex items-center">
      <div className="w-[50vw] h-[100vh] bg-red-600 flex items-center justify-center">
        <Image src="/img/roja-white.svg" alt="logo" width="650" height="250" />
      </div>
      <div className="mx-auto my-auto">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
