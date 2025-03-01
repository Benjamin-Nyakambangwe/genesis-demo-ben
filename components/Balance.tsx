"use client";

import { Button } from "./ui/button";
import { DollarSignIcon, ArrowDownIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { requestAccountBalance } from "@/lib/requestAccountBalance";
import { useDialogsState } from "@/store/dialogs";
import { RequestWithdrawalDialog } from "./RequestWithdrawalDialog";
import { Card, CardContent } from "./ui/card";

const AccountBalance = () => {
  const [balanceData, setBalanceData] = useState<{ balance: number } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateRequestWithdrawalDialogOpen = useDialogsState(
    (state) => state.updateRequestWithdrawalDialogOpen
  );

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const result = await requestAccountBalance();
        console.log("Balance data:", result);

        if (result.success && result.data) {
          setBalanceData(result.data);
        } else {
          setError(result.message || "Failed to fetch balance");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("An error occurred while fetching balance");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <>
      <Card className="border border-[#DAD7CD] shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-[#344E41] mb-3">
            Account Balance
          </h3>
          <Separator className="my-3 bg-[#DAD7CD]" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center p-3 bg-[#F5F5F5] rounded-md">
              <div className="flex items-center gap-2">
                {/* <DollarSignIcon className="w-5 h-5 text-[#344E41]" /> */}
                <span className="font-medium text-[#344E41] mr-2">
                  Available
                </span>
              </div>
              {isLoading ? (
                <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
              ) : error ? (
                <span
                  className="text-red-500 text-sm font-medium"
                  title={error}
                >
                  Error
                </span>
              ) : balanceData ? (
                <span className="font-bold text-lg text-[#344E41]">
                  ${balanceData.balance.toFixed(2)}
                </span>
              ) : (
                <span className="font-bold text-lg text-[#344E41]">$0.00</span>
              )}
            </div>

            <Button
              variant="outline"
              className="w-full justify-between border-[#344E41] text-[#344E41] hover:bg-[#A3B18A]/20 hover:text-[#344E41]"
              onClick={updateRequestWithdrawalDialogOpen}
            >
              <span>Request Withdrawal</span>
              <ArrowDownIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <RequestWithdrawalDialog />
    </>
  );
};

export default AccountBalance;
