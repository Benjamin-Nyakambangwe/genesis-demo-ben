import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RentPaymentButton } from "./RentPaymentButton";
import { RentPaymentDialog } from "./RentPaymentDialog";

interface RentPayment {
  id: number;
  amount: string;
  due_date: string;
  payment_date: string | null;
  status: string;
  transaction_id: string | null;
  property: {
    title: string;
    location_detail: {
      name: string;
      city: string;
    };
    owner: {
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}
const getRentPayments = async () => {
  const token = cookies().get("access")?.value;
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rent-payments/`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching rent payments:", error);
    return [];
  }
};

export default async function RentPaymentsTable() {
  const payments = await getRentPayments();

  console.log("Rent Payments", payments);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PAID":
        return "text-green-600";
      case "PENDING":
        return "text-amber-600";
      case "OVERDUE":
        return "text-red-600";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseFloat(amount));
  };

  const totalAmount = Array.isArray(payments)
    ? payments.reduce(
        (sum: number, payment: RentPayment) => sum + parseFloat(payment.amount),
        0
      )
    : 0;

  return (
    <Table className="w-full mt-14">
      <TableCaption>Your rent payment history</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Month Ending</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Landlord</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(payments) &&
          payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{formatDate(payment.due_date)}</TableCell>
              <TableCell>{formatAmount(payment.amount)}</TableCell>
              <TableCell className={getStatusColor(payment.status)}>
                {payment.status}
              </TableCell>
              <TableCell>{payment.property.title}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">
                    {payment.property.owner.first_name}{" "}
                    {payment.property.owner.last_name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {payment.property.owner.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {payment.property.location_detail.name},{" "}
                {payment.property.location_detail.city}
              </TableCell>
              <TableCell>
                {payment.status.toUpperCase() === "PENDING" && (
                  <RentPaymentButton payment={payment} />
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total Amount</TableCell>
          <TableCell>{formatAmount(totalAmount.toString())}</TableCell>
        </TableRow>
      </TableFooter>

      {/* <RentPaymentDialog /> */}
    </Table>
  );
}
