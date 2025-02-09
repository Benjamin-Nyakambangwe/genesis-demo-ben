"use client";

import { useTenantDetailsStore } from "@/store/tenantDetails";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
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

  console.log("display details", displayDetails);
  // Function to mask all characters
  const maskData = (value: string) => {
    if (!value) return "";
    return "•".repeat(value.length);
  };

  return (
    <Card className="w-full">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Tenant Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Name:</strong> {displayDetails?.user.first_name}{" "}
              {displayDetails?.user.last_name}
            </p>
            <p>
              <strong>National ID:</strong>{" "}
              {isLandlord
                ? maskData(displayDetails?.id_number)
                : displayDetails?.id_number}
            </p>
            <p>
              <strong>Email:</strong> {displayDetails?.user.email}
            </p>
            <p>
              <strong>Phone:</strong> {displayDetails?.phone}
            </p>
            <p>
              <strong>Date of Birth:</strong> {displayDetails?.date_of_birth}
            </p>
            <p>
              <strong>Gender:</strong> {displayDetails?.gender}
            </p>
            <p>
              <strong>Marital Status:</strong> {displayDetails?.marital_status}
            </p>
            <p>
              <strong>Occupation:</strong> {displayDetails?.occupation}
            </p>
            <p>
              <strong>Employer:</strong>{" "}
              {isLandlord
                ? maskData(displayDetails?.employer)
                : displayDetails?.employer}
            </p>
            <p>
              <strong>Work Phone:</strong>{" "}
              {isLandlord
                ? maskData(displayDetails?.work_phone)
                : displayDetails?.work_phone}
            </p>
          </div>
          <div>
            <p>
              <strong>Emergency Contact:</strong>{" "}
              {displayDetails?.emergency_contact_name}
            </p>
            <p>
              <strong>Emergency Contact Phone:</strong>{" "}
              {displayDetails?.emergency_contact_phone}
            </p>
            <p>
              <strong>Preferred Lease Term:</strong>{" "}
              {displayDetails?.preferred_lease_term} months
            </p>
            <p>
              <strong>Max Rent:</strong> ${displayDetails?.max_rent}
            </p>
            <p>
              <strong>Preferred Move-in Date:</strong>{" "}
              {displayDetails?.preferred_move_in_date}
            </p>
            <p>
              <strong>Preferred Area:</strong> {displayDetails?.preferred_area}
            </p>
            <p>
              <strong>Number of Occupants:</strong>{" "}
              {displayDetails?.number_of_occupants}
            </p>
            <p>
              <strong>Pets:</strong> {displayDetails?.pets ? "Yes" : "No"}
            </p>
            {displayDetails?.pets && (
              <p>
                <strong>Pet Details:</strong> {displayDetails?.pet_details}
              </p>
            )}
            <p>
              <strong>Smoker:</strong> {displayDetails?.smoker ? "Yes" : "No"}
            </p>
            <p>
              <strong>Has Vehicle:</strong>{" "}
              {displayDetails?.has_vehicle ? "Yes" : "No"}
            </p>
            {displayDetails?.has_vehicle && (
              <p>
                <strong>Number of Vehicles:</strong>{" "}
                {displayDetails?.num_of_vehicles}
              </p>
            )}
            <p>
              <strong>Criminal Record:</strong>{" "}
              {displayDetails?.criminal_record ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <div className="mt-1">
          <h3 className="text-xl font-semibold mb-2">Next Of Kin</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Next Of Kin Name:</strong>{" "}
                {displayDetails?.next_of_kin_name}
              </p>
              <p>
                <strong>Next Of Kin Email:</strong>{" "}
                {displayDetails?.next_of_kin_email}
              </p>
              <p>
                <strong>Next Of Kin Phone:</strong>{" "}
                {displayDetails?.next_of_kin_phone}
              </p>
              <p>
                <strong>Next Of Kin Relation:</strong>{" "}
                {displayDetails?.next_of_kin_relation}
              </p>
            </div>
            {isLandlord && (
              <div>
                <Image
                  src={
                    displayDetails?.profile_image
                      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${displayDetails.profile_image}`
                      : "/img/avatar.png"
                  }
                  alt="Profile"
                  width={250}
                  height={250}
                  className="rounded"
                />
              </div>
            )}
            {/* <div>
              <p>
                <strong>Reference 2 Name:</strong>{" "}
                {displayDetails?.personal_reference_2_name}
              </p>
              <p>
                <strong>Reference 2 Phone:</strong>{" "}
                {displayDetails?.personal_reference_2_phone}
              </p>
              <p>
                <strong>Reference 2 Relation:</strong>{" "}
                {displayDetails?.personal_reference_2_relation}
              </p>
            </div> */}
          </div>
        </div>
        {displayDetails?.additional_notes && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Additional Notes</h3>
            <p>{displayDetails?.additional_notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
