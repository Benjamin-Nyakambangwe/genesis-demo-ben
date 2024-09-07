import React from "react";
import Image from "next/image";

const RegistrationSuccesspage = () => {
  return (
    <div className="flex items-center justify-center flex-col mt-20">
      <Image src="/img/RO-JA.svg" alt="logo" width="650" height="250" />
      <h1 className="text-2xl font-bold mt-5 text-center">
        Your Registration Was Successful <br /> Please Check Your Email And
        Activate Your Account
      </h1>
    </div>
  );
};

export default RegistrationSuccesspage;
