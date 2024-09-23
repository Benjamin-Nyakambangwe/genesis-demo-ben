import { RegisterForm } from "@/components/forms/Register";

const RegisterPage = () => {
  return (
    <div className="flex items-center">
      <div className="w-[50vw] h-[100vh] bg-[#344E41] flex items-center justify-center">
        <img src="/img/roja-white.svg" alt="logo" width="650" height="250" />
      </div>
      <div className="mx-auto my-auto">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
