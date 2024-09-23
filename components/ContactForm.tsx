"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

interface ContactFormProps {
  listingId: string;
}

export default function ContactForm({ listingId }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);

    // Basic validation
    if (!formData.firstName || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const submissionData = {
      ...formData,
      listingId: listingId,
      ownedBy: "benjaminnyakambangwe@gmail.com",
    };

    try {
      const response = await fetch(
        "https://fsboafrica.com/api/enquiries/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Success",
          description:
            data.message || "Your enquiry has been sent successfully!",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send enquiry");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as Error).message ||
          "Failed to send enquiry. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full md:w-[350px]">
      <CardHeader>
        {/* <div className="relative h-48">
          <Image
            src="/assets/form-logo.png"
            alt="hero"
            fill
            style={{ objectFit: "cover" }}
          />
        </div> */}
        <CardTitle className="text-center p-4">Housing Investment</CardTitle>
        <Button
          variant="outline"
          className="w-full mb-2 text-[#344E41] border-[#344E41]"
        >
          <Phone className="h-3 w-3 mr-2 text-[#344E41]" /> Reveal Owner's
          Contact
        </Button>
        {/* <Button
          variant="outline"
          className="w-full  text-red-600 border-red-600"
        >
          <Phone className="h-3 w-3 mr-2 text-red-600" />
          Call Agent
        </Button> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Textarea
                id="message"
                name="message"
                placeholder="Type your message here."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <CardFooter className="flex flex-col items-center mt-4">
            <Button
              className="w-full bg-[#344E41] text-[#DAD7CD] hover:bg-[#A3B18A] rounded-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            <div>
              <p className="text-xs text-center mt-2">
                By sending inquiry messages, you agree to our{" "}
                <span className="text-[#344E41] font-bold">
                  <Link href="/terms-of-service">Terms and Conditions.</Link>
                </span>
              </p>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
