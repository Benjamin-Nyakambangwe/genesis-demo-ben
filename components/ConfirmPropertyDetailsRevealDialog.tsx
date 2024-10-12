"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";

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
import { useDialogsState } from "@/store/dialogs";
import { usePropertiesStore } from "@/store/properties";
import { getTetantSubscriptionDetailsAction } from "@/lib/getTetantSubscriptionDetails";
import { giveTenantAccessAction } from "@/lib/giveTenantAccess";
interface DialogsStore {
  isConfirmPropertyDetailsDialogOpen: boolean;
  updateConfirmPropertyDetailsDialogOpen: () => void;
}

interface PropertiesStore {
  updateShowPropertyDetails: (showPropertyDetails: boolean) => void;
  updateCurrentPropertyId: (propertyId: string) => void;
}

interface TenantSubscriptionDetails {
  num_properties?: number;
  subscription_plan?: string;
  // Add other properties as needed
}

export function ConfirmPropertyDetailsDialog({ price, propertyId }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const updateConfirmPropertyDetailsDialogOpen = useDialogsState(
    (state: DialogsStore) => state.updateConfirmPropertyDetailsDialogOpen
  );
  const updateShowPropertyDetails = usePropertiesStore(
    (state: PropertiesStore) => state.updateShowPropertyDetails
  );
  const updateCurrentPropertyId = usePropertiesStore(
    (state: PropertiesStore) => state.updateCurrentPropertyId
  );
  const isConfirmPropertyDetailsDialogOpen = useDialogsState(
    (state: DialogsStore) => state.isConfirmPropertyDetailsDialogOpen
  );
  const [
    localIsConfirmPropertyDetailsDialogOpen,
    setLocalIsConfirmPropertyDetailsDialogOpen,
  ] = useState<boolean>(isConfirmPropertyDetailsDialogOpen);
  const [tenantSubscriptionDetails, setTenantSubscriptionDetails] =
    useState<TenantSubscriptionDetails | null>(null);
  const [isElligible, setIsElligible] = useState<boolean>(false);

  const getTenantSubscriptionDetails = useCallback(async () => {
    try {
      console.log("Fetching tenant subscription details...");
      const result = await getTetantSubscriptionDetailsAction();
      console.log("Raw result:", result);

      if (result && typeof result === "object") {
        if ("success" in result && "data" in result) {
          console.log("Structured result:", result);
          if (result.success && result.data) {
            const parsedData = JSON.parse(result.data);
            console.log("Setting tenant subscription details:", parsedData);
            setTenantSubscriptionDetails(parsedData);
          } else {
            console.error("API request was not successful:", result);
          }
        } else {
          console.log("Direct data result:", result);
          setTenantSubscriptionDetails(result as TenantSubscriptionDetails);
        }
      } else {
        console.error("Unexpected result type:", typeof result);
      }
    } catch (error) {
      console.error("Failed to get tenant subscription details:", error);
    }
  }, []);

  useEffect(() => {
    console.log("Fetching tenant subscription details...");
    if (isConfirmPropertyDetailsDialogOpen) {
      getTenantSubscriptionDetails();
    }
    setLocalIsConfirmPropertyDetailsDialogOpen(
      isConfirmPropertyDetailsDialogOpen
    );
  }, [isConfirmPropertyDetailsDialogOpen, getTenantSubscriptionDetails]);

  useEffect(() => {
    if (tenantSubscriptionDetails) {
      let eligible = false;
      switch (tenantSubscriptionDetails.subscription_plan) {
        case "basic":
          eligible = price <= 200;
          break;
        case "standard":
          eligible = price <= 500;
          break;
        case "premium":
          eligible = price <= 1000;
          break;
        case "luxury":
          eligible = price <= 100000;
          break;
      }
      setIsElligible(eligible);
    }
  }, [tenantSubscriptionDetails, price]);

  const handleContinue = async () => {
    // console.log("Giving tenant access to property", propertyId);
    updateCurrentPropertyId(propertyId);
    updateShowPropertyDetails(true);
    const result = await giveTenantAccessAction(propertyId);
    console.log(result);
    if (result.success) {
      updateConfirmPropertyDetailsDialogOpen();
      // window.location.reload();
    } else {
      alert("Failed to give tenant access");
    }
  };

  const scrollableContentStyle =
    "overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide";

  const dialogContent = (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Reveal Property Details</DialogTitle>
        <DialogDescription>
          {isElligible ? (
            <div className="text-sm text-gray-500">
              <h3 className="text-lg font-medium text-center mb-2 ">
                Are you sure you want to reveal the property details?
              </h3>
              {tenantSubscriptionDetails
                ? `Your Plan has ${tenantSubscriptionDetails.num_properties} properties views left. Revealing the property details will use one of your properties. `
                : "Loading..."}
              <Button onClick={handleContinue} className="mt-4 w-full">
                Continue
              </Button>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              <h3 className="text-lg font-medium text-center mb-2 ">
                You are not eligible to reveal the property details. Upgrade
                your plan to reveal the property details.
              </h3>
            </div>
          )}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );

  if (isDesktop) {
    return (
      <Dialog
        open={isConfirmPropertyDetailsDialogOpen}
        onOpenChange={updateConfirmPropertyDetailsDialogOpen}
      >
        {dialogContent}
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isConfirmPropertyDetailsDialogOpen}
      onOpenChange={updateConfirmPropertyDetailsDialogOpen}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Reveal Property Details</DrawerTitle>
          <DrawerDescription>{dialogContent}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
