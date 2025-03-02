"use client";

import * as React from "react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialogsState } from "@/store/dialogs";
import { submitRentPaymentAction } from "@/lib/submitRentPayment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: number;
  property: string;
  tenant: string;
  amount: number;
  payment_date: string;
  transaction_id: string;
}

interface WithdrawalRequest {
  id: number;
  amount: number;
  status: string;
  reference: string;
  requested_at: string;
  processed_at?: string;
}

interface AccountBalance {
  balance: number;
  last_updated: string;
  recent_transactions: Transaction[];
  withdrawal_requests: WithdrawalRequest[];
}

interface DialogsStore {
  isBalanceDialogOpen: boolean;
  updateBalanceDialogOpen: () => void;
}

export function BalanceDialog({
  accountData,
}: {
  accountData: AccountBalance;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const updateBalanceDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateBalanceDialogOpen
  );
  const isBalanceDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isBalanceDialogOpen
  );
  const [localIsBalanceDialogOpen, setLocalIsBalanceDialogOpen] =
    useState<boolean>(isBalanceDialogOpen);

  useEffect(() => {
    setLocalIsBalanceDialogOpen(isBalanceDialogOpen);
  }, [isBalanceDialogOpen]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy h:mm a");
    } catch (error) {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const scrollableContentStyle =
    "overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide";

  const content = (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Recent Transactions</h3>
        {accountData.recent_transactions.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountData.recent_transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.property}
                    </TableCell>
                    <TableCell>{transaction.tenant}</TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {formatDate(transaction.payment_date)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No recent transactions</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Withdrawal Requests</h3>
        {accountData.withdrawal_requests.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requested</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountData.withdrawal_requests.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell className="font-medium">
                      {withdrawal.reference}
                    </TableCell>
                    <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(withdrawal.status)}
                        variant="outline"
                      >
                        {withdrawal.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formatDateTime(withdrawal.requested_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No withdrawal requests</p>
        )}
      </div>

      <div className="mt-4">
        <Button
          onClick={updateBalanceDialogOpen}
          className="w-full bg-[#344E41] text-white hover:bg-[#A3B18A] rounded-full"
        >
          Close
        </Button>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isBalanceDialogOpen} onOpenChange={updateBalanceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Account Balance: ${accountData.balance.toFixed(2)}
            </DialogTitle>
            <DialogDescription>
              Last updated: {formatDateTime(accountData.last_updated)}
            </DialogDescription>
          </DialogHeader>
          <div className={scrollableContentStyle}>{content}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isBalanceDialogOpen} onOpenChange={updateBalanceDialogOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            Account Balance: ${accountData.balance.toFixed(2)}
          </DrawerTitle>
          <DrawerDescription>
            Last updated: {formatDateTime(accountData.last_updated)}
          </DrawerDescription>
        </DrawerHeader>
        <div className={cn(scrollableContentStyle, "px-4")}>{content}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function RentPaymentDialog({ payment }: { payment: Payment }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const updateRentPaymentDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateRentPaymentDialogOpen
  );
  const isRentPaymentDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isRentPaymentDialogOpen
  );
  const [localIsRentPaymentDialogOpen, setLocalIsRentPaymentDialogOpen] =
    useState<boolean>(isRentPaymentDialogOpen);
  const [phone, setPhone] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    setLocalIsRentPaymentDialogOpen(isRentPaymentDialogOpen);
  }, [isRentPaymentDialogOpen]);

  const tenantEmail = payment.property.current_tenant.email;
  const paymentId = payment.id;
  const amount = payment.amount;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await submitRentPaymentAction({
        tenantEmail,
        phone,
        paymentId,
      });
      setPaymentStatus(result);
      if (result.success) {
        // Optionally close the dialog or reset the form
        updateRentPaymentDialogOpen();
        window.location.reload();
      }
    } catch (error) {
      console.error("Payment submission failed:", error);
      setPaymentStatus({
        success: false,
        message: "Payment failed. Please try again.",
      });
    }
  };

  const scrollableContentStyle =
    "overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide";

  const content = (
    <form onSubmit={handlePayment}>
      <div className="items-center gap-4">
        <Label htmlFor="phone" className="text-right">
          Ecocash Number
        </Label>
        <Input
          id="phone"
          type="tel"
          className="col-span-3"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
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
          className="bg-[#344E41] text-white hover:bg-[#A3B18A] mt-4 w-full rounded-full"
        >
          Pay
        </Button>
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog
        open={isRentPaymentDialogOpen}
        onOpenChange={updateRentPaymentDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rent Payment</DialogTitle>
            <DialogDescription>
              {payment.property.title} - {amount}
            </DialogDescription>
          </DialogHeader>
          <div className={scrollableContentStyle}>{content}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isRentPaymentDialogOpen}
      onOpenChange={updateRentPaymentDialogOpen}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Rent Payment</DrawerTitle>
          <DrawerDescription>
            {payment.property.title} - {amount}
          </DrawerDescription>
        </DrawerHeader>
        <div className={cn(scrollableContentStyle, "px-4")}>{content}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
