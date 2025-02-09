"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { submitMessageAction } from "@/lib/submitMessage";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface MessageFormProps {
  tenantEmail: string;
  tenantId: string;
}

export default function MessageForm({
  tenantEmail,
  tenantId,
}: MessageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      const result = await submitMessageAction(formData);
      if (result.success) {
        toast.success("Message sent successfully");
        setMessage(""); // Clear the message
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (error) {
      toast.error("An error occurred while sending the message");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center p-2 sm:p-4">
          Quick Message Tenant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <input type="hidden" name="receiver" value={tenantEmail} />
          <input type="hidden" name="tenant_id" value={tenantId} />
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here."
                required
                className="min-h-[80px]"
              />
            </div>
          </div>
          <CardFooter className="flex flex-col items-center mt-4">
            <Button
              className="w-full bg-[#344E41] text-[#DAD7CD] hover:bg-[#A3B18A] rounded-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
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
