"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    const formdata = new FormData();
    const form = e.currentTarget;

    formdata.append(
      "email",
      (form.elements.namedItem("email") as HTMLInputElement).value
    );
    formdata.append(
      "name",
      (form.elements.namedItem("name") as HTMLInputElement).value
    );
    formdata.append(
      "message",
      (form.elements.namedItem("message") as HTMLTextAreaElement).value
    );

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/`,
      requestOptions
    );
    const data = await res.json();
    console.log("data", data);

    if (res.ok) {
      setFormStatus("success");
    } else {
      setFormStatus("error");
    }
  };

  return (
    <>
      <div
        className="w-full h-[400px] relative mb-12"
        style={{
          backgroundImage: "url('/img/contact-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl mt-24 mb-32">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="md:mx-auto w-full">
            <CardHeader>
              <CardTitle className="text-[#344E41]">
                Get in Touch With Us!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="focus-visible:ring-[#344E41] focus:border-0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="focus-visible:ring-[#344E41] focus:border-0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    type="text"
                    rows={4}
                    required
                    className="focus-visible:ring-[#344E41] focus:border-0"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#344E41] hover:bg-[#A3B18A]"
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
                {formStatus === "success" && (
                  <p className="text-green-600 text-center">
                    Message sent successfully! We will get back to you soon.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="text-red-600 text-center">
                    An error occurred. Please try again.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#344E41]">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-[#344E41]" />
                  <p>108 Fife Avenue, Harare, Zimbabwe</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-[#344E41]" />
                  <p>+263 788 288 826</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-[#344E41]" />
                  <p>support@ro-ja.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#344E41]">Our Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242402.46620834937!2d30.91290955!3d-17.824238449999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4e706b17161%3A0xa3c3508cfca2833c!2sHarare%2C%20Zimbabwe!5e0!3m2!1sen!2s!4v1682805727965!5m2!1sen!2s"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ro-ja Office Location"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
