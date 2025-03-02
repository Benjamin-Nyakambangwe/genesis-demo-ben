"use client";

import { useTenantDetailsStore } from "@/store/tenantDetails";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  MapPin,
  Home,
  Heart,
  DollarSign,
  Clock,
  Users,
  PawPrint,
  Cigarette,
  Car,
  AlertTriangle,
  CreditCard,
  UserCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TenantDetailsCard({
  initialTenantDetails,
  isLandlord,
}: {
  initialTenantDetails: any;
  isLandlord: boolean;
}) {
  const { tenantDetails, updateTenantDetails } = useTenantDetailsStore();

  useEffect(() => {
    updateTenantDetails(initialTenantDetails);
  }, [initialTenantDetails, updateTenantDetails]);

  const displayDetails = tenantDetails || initialTenantDetails;

  // Function to mask all characters
  const maskData = (value: string) => {
    if (!value) return "";
    return "•".repeat(value.length);
  };

  return (
    <Card className="w-full border border-[#DAD7CD] shadow-sm overflow-hidden">
      <div className="bg-[#344E41] text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <UserCircle className="mr-2 h-5 w-5" />
          Tenant Profile
        </h2>
        {displayDetails?.is_verified && (
          <Badge className="bg-green-500 hover:bg-green-600">Verified</Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Image Section */}
          {/* <div className="md:col-span-1 flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#A3B18A] shadow-md mb-4">
              <Image
                src={
                  displayDetails?.profile_image
                    ? displayDetails.profile_image.startsWith("http")
                      ? displayDetails.profile_image
                      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${displayDetails.profile_image}`
                    : "/img/avatar.png"
                }
                alt="Profile"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#344E41] text-center">
              {displayDetails?.user?.first_name}{" "}
              {displayDetails?.user?.last_name}
            </h3>
            <div className="mt-2 flex items-center">
              <Mail className="h-4 w-4 text-[#588157] mr-2" />
              <span>{displayDetails?.user?.email}</span>
            </div>
            <div className="mt-1 flex items-center">
              <Phone className="h-4 w-4 text-[#588157] mr-2" />
              <span>{displayDetails?.phone}</span>
            </div>
          </div> */}

          {/* Personal Information */}
          <div className="md:col-span-3">
            <div className="bg-[#F5F7F5] rounded-md p-4 mb-4">
              <h3 className="text-lg font-semibold text-[#344E41] mb-3 flex items-center">
                <User className="h-5 w-5 mr-2 text-[#588157]" />
                Personal Information
              </h3>
              <Separator className="mb-4 bg-[#DAD7CD]" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    National ID:
                  </span>
                  <span className="ml-2">
                    {isLandlord
                      ? maskData(displayDetails?.id_number)
                      : displayDetails?.id_number}
                  </span>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Date of Birth:
                  </span>
                  <span className="ml-2">{displayDetails?.date_of_birth}</span>
                </div>

                <div className="flex items-center">
                  <User className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Gender:
                  </span>
                  <span className="ml-2">{displayDetails?.gender}</span>
                </div>

                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Marital Status:
                  </span>
                  <span className="ml-2">{displayDetails?.marital_status}</span>
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div className="bg-[#F5F7F5] rounded-md p-4 mb-4">
              <h3 className="text-lg font-semibold text-[#344E41] mb-3 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-[#588157]" />
                Employment Information
              </h3>
              <Separator className="mb-4 bg-[#DAD7CD]" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Occupation:
                  </span>
                  <span className="ml-2">{displayDetails?.occupation}</span>
                </div>

                <div className="flex items-center">
                  <Home className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Employer:
                  </span>
                  <span className="ml-2">
                    {isLandlord
                      ? maskData(displayDetails?.employer)
                      : displayDetails?.employer}
                  </span>
                </div>

                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Work Phone:
                  </span>
                  <span className="ml-2">
                    {isLandlord
                      ? maskData(displayDetails?.work_phone)
                      : displayDetails?.work_phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Housing Preferences */}
            <div className="bg-[#F5F7F5] rounded-md p-4 mb-4">
              <h3 className="text-lg font-semibold text-[#344E41] mb-3 flex items-center">
                <Home className="h-5 w-5 mr-2 text-[#588157]" />
                Housing Preferences
              </h3>
              <Separator className="mb-4 bg-[#DAD7CD]" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Lease Term:
                  </span>
                  <span className="ml-2">
                    {displayDetails?.preferred_lease_term} months
                  </span>
                </div>

                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Max Rent:
                  </span>
                  <span className="ml-2">${displayDetails?.max_rent}</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Move-in Date:
                  </span>
                  <span className="ml-2">
                    {displayDetails?.preferred_move_in_date}
                  </span>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Preferred Area:
                  </span>
                  <span className="ml-2">{displayDetails?.preferred_area}</span>
                </div>

                <div className="flex items-center">
                  <Users className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Occupants:
                  </span>
                  <span className="ml-2">
                    {displayDetails?.number_of_occupants}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-[#F5F7F5] rounded-md p-4">
              <h3 className="text-lg font-semibold text-[#344E41] mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-[#588157]" />
                Additional Information
              </h3>
              <Separator className="mb-4 bg-[#DAD7CD]" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex items-center">
                  <PawPrint className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Pets:
                  </span>
                  <Badge
                    className={`ml-2 ${
                      displayDetails?.pets ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    {displayDetails?.pets ? "Yes" : "No"}
                  </Badge>
                </div>

                {displayDetails?.pets && (
                  <div className="flex items-center">
                    <PawPrint className="h-4 w-4 text-[#588157] mr-2" />
                    <span className="text-sm font-medium text-[#344E41]">
                      Pet Details:
                    </span>
                    <span className="ml-2">{displayDetails?.pet_details}</span>
                  </div>
                )}

                <div className="flex items-center">
                  <Cigarette className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Smoker:
                  </span>
                  <Badge
                    className={`ml-2 ${
                      displayDetails?.smoker ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    {displayDetails?.smoker ? "Yes" : "No"}
                  </Badge>
                </div>

                <div className="flex items-center">
                  <Car className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Vehicle:
                  </span>
                  <Badge
                    className={`ml-2 ${
                      displayDetails?.has_vehicle
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {displayDetails?.has_vehicle ? "Yes" : "No"}
                  </Badge>
                </div>

                {displayDetails?.has_vehicle && (
                  <div className="flex items-center">
                    <Car className="h-4 w-4 text-[#588157] mr-2" />
                    <span className="text-sm font-medium text-[#344E41]">
                      Number of Vehicles:
                    </span>
                    <span className="ml-2">
                      {displayDetails?.num_of_vehicles}
                    </span>
                  </div>
                )}

                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Criminal Record:
                  </span>
                  <Badge
                    className={`ml-2 ${
                      displayDetails?.criminal_record
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {displayDetails?.criminal_record ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact & Next of Kin */}
        <div className="mt-6 bg-[#F5F7F5] rounded-md p-4">
          <h3 className="text-lg font-semibold text-[#344E41] mb-3 flex items-center">
            <Phone className="h-5 w-5 mr-2 text-[#588157]" />
            Emergency Contact & Next of Kin
          </h3>
          <Separator className="mb-4 bg-[#DAD7CD]" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#344E41] mb-2">
                Emergency Contact
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Name:
                  </span>
                  <span className="ml-2">
                    {displayDetails?.emergency_contact_name}
                  </span>
                </div>

                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Phone:
                  </span>
                  <span className="ml-2">
                    {displayDetails?.emergency_contact_phone}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-[#344E41] mb-2">Next of Kin</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Name:
                  </span>
                  <span className="ml-2">
                    {displayDetails?.next_of_kin_name}
                  </span>
                </div>

                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Email:
                  </span>
                  <span className="ml-2">
                    {displayDetails?.next_of_kin_email}
                  </span>
                </div>

                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Phone:
                  </span>
                  <span className="ml-2">
                    {displayDetails?.next_of_kin_phone}
                  </span>
                </div>

                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-[#588157] mr-2" />
                  <span className="text-sm font-medium text-[#344E41]">
                    Relation:
                  </span>
                  <span className="ml-2">
                    {displayDetails?.next_of_kin_relation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        {displayDetails?.additional_notes && (
          <div className="mt-6 bg-[#F5F7F5] rounded-md p-4">
            <h3 className="text-lg font-semibold text-[#344E41] mb-3 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-[#588157]" />
              Additional Notes
            </h3>
            <Separator className="mb-4 bg-[#DAD7CD]" />
            <p className="text-gray-700">{displayDetails?.additional_notes}</p>
          </div>
        )}

        {/* {isLandlord && (
          <div>
            <Image
              src={
                displayDetails?.profile_image
                  ? displayDetails.profile_image.startsWith("http")
                    ? displayDetails.profile_image
                    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${displayDetails.profile_image}`
                  : "/img/avatar.png"
              }
              alt="Profile"
              width={250}
              height={250}
              className="rounded"
            />
          </div>
        )} */}
      </CardContent>
    </Card>
  );
}
