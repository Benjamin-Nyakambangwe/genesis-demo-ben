"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const RegisterSubmit = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-[#344E41] hover:bg-[#A3B18A]"
      id="submit-button"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating account...
        </>
      ) : (
        "Create an account"
      )}
    </Button>
  );
};

export default RegisterSubmit;
