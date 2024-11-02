"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EcocashPaymentDialog } from "@/components/EcocashPaymentDialog";

import { useDialogsState } from "@/store/dialogs";
import { useEffect, useState } from "react";

interface DialogsStore {
  isEcocashPaymentDialogOpen: boolean;
  updateEcocashPaymentDialogOpen: () => void;
}
const tiers = [
  {
    name: "Basic",
    price: 5,
    features: 3,
    maxValue: 200,
    audience: "Low-income renters or students",
    description: "Essential features for those on a budget",
  },
  {
    name: "Standard",
    price: 15,
    features: 5,
    maxValue: 500,
    audience: "Middle-income renters or small families",
    description: "Great value for small families and individuals",
  },
  {
    name: "Premium",
    price: 30,
    features: 7,
    maxValue: 1000,
    audience: "Upper-middle-income renters or larger families",
    description: "Enhanced features for a superior living experience",
  },
  {
    name: "Luxury",
    price: 50,
    features: 10,
    maxValue: 100000,
    audience: "High-income renters or expatriates",
    description: "Exclusive amenities for the most discerning residents",
  },
];

const faqs = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No, all our plans are billed monthly and you can cancel at any time without any penalties.",
  },
  {
    question: "Do you offer discounts for annual subscriptions?",
    answer:
      "Yes, we offer a 10% discount for annual subscriptions on all our plans.",
  },
  // Add more FAQs as needed
];

const testimonials = [
  {
    name: "John Doe",
    role: "Renter",
    comment:
      "This service has made my renting experience so much easier. Highly recommended!",
  },
  {
    name: "Jane Smith",
    role: "Property Manager",
    comment:
      "The features offered in the Premium plan have streamlined our operations significantly.",
  },
  // Add more testimonials as needed
];

export default function PricingPage() {
  const updateEcocashPaymentDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateEcocashPaymentDialogOpen
  );
  const isEcocashPaymentDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isEcocashPaymentDialogOpen
  );
  const [localIsEcocashPaymentDialogOpen, setLocalIsEcocashPaymentDialogOpen] =
    useState<boolean>(isEcocashPaymentDialogOpen);
  const [selectedTier, setSelectedTier] = useState(null);

  useEffect(() => {
    setLocalIsEcocashPaymentDialogOpen(isEcocashPaymentDialogOpen);
  }, [isEcocashPaymentDialogOpen]);
  return (
    <section className="w-full pt-32 pb-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="mb-8 space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#344E41]">
            Pricing Plans
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Choose the perfect plan for your needs. Upgrade or downgrade at any
            time.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "flex flex-col justify-between",
                tier.name === "Luxury" ? "border-primary" : ""
              )}
            >
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-3xl font-bold text-[#344E41]">
                  ${tier.price}
                  <span className="text-sm font-normal text-gray-500">
                    /month
                  </span>
                </div>
                <ul className="grid gap-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4" /> {tier.features} key
                    features
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    {tier.maxValue === 100000
                      ? "Unlimited Value"
                      : `Up to $${tier.maxValue.toLocaleString()} in value`}
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4" /> {tier.audience}
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    setSelectedTier(tier);
                    updateEcocashPaymentDialogOpen();
                  }}
                  className="w-full bg-[#344E41] text-primary-foreground"
                >
                  Choose {tier.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Move EcocashPaymentDialog outside the card loop */}
        {selectedTier && <EcocashPaymentDialog plan={selectedTier} />}

        {/* Feature Comparison Table */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Feature Comparison</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                {tiers.map((tier) => (
                  <TableHead key={tier.name}>{tier.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Number of House Views</TableCell>
                {tiers.map((tier) => (
                  <TableCell key={tier.name}>{tier.features}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Max Property Value</TableCell>
                {tiers.map((tier) => (
                  <TableCell key={tier.name}>
                    {tier.maxValue === 100000
                      ? "Unlimited"
                      : `$${tier.maxValue.toLocaleString()}`}
                  </TableCell>
                ))}
              </TableRow>
              {/* Add more feature rows as needed */}
            </TableBody>
          </Table>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Money-back Guarantee */}
        {/* <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            30-Day Money-Back Guarantee
          </h2>
          <p className="text-gray-600">
            Try our service risk-free. If you're not satisfied within 30 days,
            we'll refund your payment.
          </p>
        </div> */}

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-gray-600">
            Our sales team is here to assist you. Contact us at{" "}
            <a
              href="mailto:sales@example.com"
              className="text-primary hover:underline"
            >
              sales@ro-ja.com
            </a>{" "}
            or call us at{" "}
            <a href="tel:+1234567890" className="text-primary hover:underline">
              (123) 456-7890
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
