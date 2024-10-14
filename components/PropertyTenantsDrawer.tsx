"use client";

import * as React from "react";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { cn } from "@/lib/utils";
import { useDialogsState } from "@/store/dialogs";
import Link from "next/link";
import { setCurrentTenantAction } from "@/lib/setCurrentTenant";
interface DialogsStore {
  propertyToEdit: any; // Replace 'any' with your property type
  isPropertyTenantsDrawerOpen: boolean;
  updatePropertyTenantsDrawerOpen: () => void;
}

export default function PropertyTenantsDrawer() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isPropertyTenantsDrawerOpen = useDialogsState(
    (state: DialogsStore) => state.isPropertyTenantsDrawerOpen
  );
  const updatePropertyTenantsDrawerOpen = useDialogsState(
    (state: DialogsStore) => state.updatePropertyTenantsDrawerOpen
  );
  const propertyToEdit = useDialogsState(
    (state: DialogsStore) => state.propertyToEdit
  );

  console.log(propertyToEdit);

  const scrollableContentStyle =
    "overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide";

  const content = (
    <div className={scrollableContentStyle}>
      <Table>
        <TableCaption>
          A list of tenants interested in this property.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>

            <TableHead>Action</TableHead>
            <TableHead>Assign As Tenant</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {propertyToEdit?.tenants_with_access.map((tenant: any) => (
            <TableRow key={tenant.id}>
              <TableCell className="font-medium">{tenant.first_name}</TableCell>
              <TableCell>{tenant.last_name}</TableCell>
              <TableCell>
                <Button variant="outline">
                  <Link href={`/tenant-profile/${tenant.id}`}>
                    View Profile
                  </Link>
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={async () =>
                    await setCurrentTenantAction(tenant.id, propertyToEdit.id)
                  }
                >
                  Assign To Property
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog
        open={isPropertyTenantsDrawerOpen}
        onOpenChange={updatePropertyTenantsDrawerOpen}
      >
        <DialogContent className="sm:max-w-[675px]">
          <DialogHeader>
            <DialogTitle>View Property Tenants</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isPropertyTenantsDrawerOpen}
      onOpenChange={updatePropertyTenantsDrawerOpen}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>View Property Tenants</DrawerTitle>
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
