import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import Link from "next/link";
import { cookies } from "next/headers";
import RevealPropertyDetailsButton from "./RevealPropertyDetailsButton";
import CopyProtectedContent from "./CopyProtectedContent";
import { submitMessageAction } from "@/lib/submitMessage";
import ContactClientForm from "./ContactClientForm";

interface ContactFormProps {
  listingId: string;
  landlord?: {
    phone: string;
    user: {
      email: string;
    };
  };
  address?: string;
  property: any; // Consider creating a proper type for this
}

export default function ContactForm({
  listingId,
  landlord,
  address,
  property,
}: ContactFormProps) {
  const encodedUserType = cookies().get("user_details")?.value;
  const decodeUserType = encodedUserType
    ? decodeURIComponent(encodedUserType)
    : null;
  const userType = decodeUserType ? JSON.parse(decodeUserType || "") : null;

  const hasAccess = property.tenants_with_access.some(
    (tenant: { id: number }) => tenant.id === userType?.user_id
  );

  return (
    <Card className="w-full md:w-[350px]">
      <CardHeader>
        <CardTitle className="text-center p-4">Housing Investment</CardTitle>

        <CopyProtectedContent listingId={listingId} hasAccess={hasAccess}>
          <p className="text-sm text-center">
            Contact the landlord directly at:
          </p>
          <p className="text-lg font-bold">{landlord?.phone}</p>
          <p className="text-sm text-center">{landlord?.user.email}</p>
          <p className="text-sm text-center">{address}</p>
        </CopyProtectedContent>
        {!hasAccess && (
          <RevealPropertyDetailsButton
            price={property.price}
            propertyId={listingId}
          />
        )}
      </CardHeader>
      <CardContent>
        <form action={submitMessageAction}>
          <input type="hidden" name="listingId" value={listingId} />
          <input
            type="hidden"
            name="receiver"
            value={landlord?.user.email || ""}
          />
          <ContactClientForm />
        </form>
      </CardContent>
    </Card>
  );
}
