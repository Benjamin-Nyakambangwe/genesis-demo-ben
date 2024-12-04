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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { useDialogsState } from "@/store/dialogs";
import Link from "next/link";
import { setCurrentTenantAction } from "@/lib/setCurrentTenant";
import { setCurrentTenantWithLeaseDocAction } from "@/lib/setCurrentTenantWithLeaseDoc";
import { revokeCurrentTenantAction } from "@/lib/revokeCurrentTenant";

interface DialogsStore {
  propertyToEdit: any;
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

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      updatePropertyTenantsDrawerOpen();
    }
  };

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
                <Button className="bg-[#344E41] hover:bg-[#A3B18A] rounded-full">
                  <Link href={`/tenant-profile/${tenant.id}`}>
                    View Profile
                  </Link>
                </Button>
              </TableCell>
              {propertyToEdit.current_tenant?.id != tenant.id ? (
                // <TableCell>
                //   <Button
                //     className="bg-[#344E41] hover:bg-[#A3B18A]"
                //     onClick={async () =>
                //       await setCurrentTenantAction(tenant.id, propertyToEdit.id)
                //     }
                //   >
                //     Assign To Property
                //   </Button>
                // </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-[#344E41] text-[#344E41] hover:bg-[#A3B18A] hover:text-white font-medium border rounded-full"
                      >
                        Assign Tenant
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-lg border border-gray-100">
                      <DropdownMenuLabel className="text-[#344E41] font-semibold">
                        Assign To Property
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      <DropdownMenuItem
                        className="hover:bg-[#A3B18A] hover:text-white cursor-pointer"
                        onClick={async () =>
                          await setCurrentTenantWithLeaseDocAction(
                            tenant.id,
                            propertyToEdit.id
                          )
                        }
                      >
                        <span>With Automatic Lease</span>
                        <span className="ml-2 text-sm text-gray-500">
                          ($20)
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-[#A3B18A] hover:text-white cursor-pointer"
                        onClick={async () =>
                          await setCurrentTenantAction(
                            tenant.id,
                            propertyToEdit.id
                          )
                        }
                      >
                        <span>No Automatic Lease</span>
                        <span className="ml-2 text-sm text-gray-500">($0)</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              ) : (
                <TableCell>
                  <Button
                    className="bg-[#344E41] hover:bg-[#A3B18A]"
                    onClick={async () =>
                      await revokeCurrentTenantAction(
                        tenant.id,
                        propertyToEdit.id
                      )
                    }
                  >
                    Revoke Tenant
                  </Button>
                </TableCell>
              )}
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
        onOpenChange={handleOpenChange}
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
    <Drawer open={isPropertyTenantsDrawerOpen} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>View Property Tenants</DrawerTitle>
        </DrawerHeader>
        <div className={cn(scrollableContentStyle, "px-4")}>{content}</div>
        <DrawerFooter className="pt-2">
          {/* <Button 
            variant="outline" 
            onClick={() => handleOpenChange(false)}
          >
            Close
          </Button> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
