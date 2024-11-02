"use client";
import React, { useState, useRef, useTransition } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { CardFooter } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full bg-[#344E41] text-[#DAD7CD] hover:bg-[#A3B18A] rounded-full"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        "Send Message"
      )}
    </Button>
  );
}

const ContactClientForm = () => {
  return (
    <>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Textarea
            id="message"
            name="message"
            placeholder="Type your message here."
            required
          />
        </div>
      </div>
      <CardFooter className="flex flex-col items-center mt-4">
        <SubmitButton />
        <div>
          <p className="text-xs text-center mt-2">
            By sending inquiry messages, you agree to our{" "}
            <span className="text-[#344E41] font-bold">
              <Link href="/terms-of-service">Terms and Conditions.</Link>
            </span>
          </p>
        </div>
      </CardFooter>
    </>
  );
};

export default ContactClientForm;
