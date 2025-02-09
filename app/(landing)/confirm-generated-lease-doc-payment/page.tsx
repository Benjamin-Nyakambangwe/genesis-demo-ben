"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitPaymentAction } from "@/lib/submitPayment";
import { setCurrentTenantWithLeaseDocAction } from "@/lib/setCurrentTenantWithLeaseDoc";
import { Loader2, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { submitLeaseDocumentPaymentAction } from "@/lib/submitLeaseDocumentPayment";

export default function ConfirmGeneratedLeaseDocPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tenantId = searchParams.get("tenantId");
  const propertyId = searchParams.get("propertyId");
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const paymentResult = await submitLeaseDocumentPaymentAction({
        phone,
        landlordEmail: "support@ro-ja.com",
        propertyId: propertyId,
      });


      if (paymentResult.success) {
        setPaymentStatus({
          success: true,
          message: "Payment successful! Generating lease document..."
        });

        // Only proceed with lease generation if we have valid IDs
        if (!tenantId || !propertyId) {
          throw new Error("Missing tenant or property information");
        }

        // If payment is successful, generate lease doc and set tenant
        const leaseResult = await setCurrentTenantWithLeaseDocAction(
          tenantId,
          propertyId
        );

        if (leaseResult.success) {
          setPaymentStatus({
            success: true,
            message: "Lease document generated successfully!"
          });
          // Navigate to profile page after successful lease generation
          router.push("/profile");
          router.refresh();
        } else {
          throw new Error("Failed to generate lease document");
        }
      } else {
        setPaymentStatus({
          success: false,
          message: paymentResult.message || "Payment failed. Please try again."
        });
      }
    } catch (error) {
      console.error("Process failed:", error);
      setPaymentStatus({
        success: false,
        message: error instanceof Error ? error.message : "Process failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-24 flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-[#344E41]">
            Lease Document Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center p-6 bg-[#DAD7CD] rounded-lg">
            <div className="text-md text-center text-[#344E41]">
              Please pay $20 to proceed with the lease document generation and
              assign a tenant
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Ecocash Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0771111111"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="focus-visible:ring-[#344E41] focus:border-0"
              />
            </div>

            {paymentStatus && (
              <div
                className={`text-sm ${
                  paymentStatus.success ? "text-green-600" : "text-red-600"
                } mt-2`}
              >
                {paymentStatus.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#344E41] text-white hover:bg-[#A3B18A] rounded-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                "Pay Now"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
