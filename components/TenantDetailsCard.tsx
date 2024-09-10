import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TenantDetails {
  date_of_birth: string | null;
  gender: string | null;
  phone: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  occupation: string | null;
  employer: string | null;
  work_phone: string | null;
  preferred_lease_term: string | null;
  max_rent: number | null;
  preferred_move_in_date: string | null;
  preferred_area: string | null;
  number_of_occupants: number | null;
  pets: boolean;
  pet_details: string | null;
  smoker: boolean;
  has_vehicle: boolean;
  num_of_vehicles: number | null;
  criminal_record: boolean;
  personal_reference_1_name: string | null;
  personal_reference_1_phone: string | null;
  personal_reference_1_relation: string | null;
  personal_reference_2_name: string | null;
  personal_reference_2_phone: string | null;
  personal_reference_2_relation: string | null;
  additional_notes: string | null;
}

const TenantDetailsCard: React.FC<{ tenantDetails: TenantDetails }> = ({
  tenantDetails,
}) => {
  return (
    <Card className="w-[90%] mx-auto">
      <CardHeader>
        <CardTitle>Tenant Details</CardTitle>
        <CardDescription>Detailed information about the tenant</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoItem label="Date of Birth" value={tenantDetails.date_of_birth} />
          <InfoItem label="Gender" value={tenantDetails.gender} />
          <InfoItem label="Phone" value={tenantDetails.phone} />
          <InfoItem
            label="Emergency Contact"
            value={tenantDetails.emergency_contact_name}
          />
          <InfoItem
            label="Emergency Contact Phone"
            value={tenantDetails.emergency_contact_phone}
          />
          <InfoItem label="Occupation" value={tenantDetails.occupation} />
          <InfoItem label="Employer" value={tenantDetails.employer} />
          <InfoItem label="Work Phone" value={tenantDetails.work_phone} />
          <InfoItem
            label="Preferred Lease Term"
            value={tenantDetails.preferred_lease_term}
          />
          <InfoItem
            label="Max Rent"
            value={tenantDetails.max_rent?.toString()}
          />
          <InfoItem
            label="Preferred Move-in Date"
            value={tenantDetails.preferred_move_in_date}
          />
          <InfoItem
            label="Preferred Area"
            value={tenantDetails.preferred_area}
          />
          <InfoItem
            label="Number of Occupants"
            value={tenantDetails.number_of_occupants?.toString()}
          />
          <InfoItem label="Pets" value={tenantDetails.pets ? "Yes" : "No"} />
          <InfoItem label="Pet Details" value={tenantDetails.pet_details} />
          <InfoItem
            label="Smoker"
            value={tenantDetails.smoker ? "Yes" : "No"}
          />
          <InfoItem
            label="Has Vehicle"
            value={tenantDetails.has_vehicle ? "Yes" : "No"}
          />
          <InfoItem
            label="Number of Vehicles"
            value={tenantDetails.num_of_vehicles?.toString()}
          />
          <InfoItem
            label="Criminal Record"
            value={tenantDetails.criminal_record ? "Yes" : "No"}
          />
          <InfoItem
            label="Personal Reference 1"
            value={tenantDetails.personal_reference_1_name}
          />
          <InfoItem
            label="Reference 1 Phone"
            value={tenantDetails.personal_reference_1_phone}
          />
          <InfoItem
            label="Reference 1 Relation"
            value={tenantDetails.personal_reference_1_relation}
          />
          <InfoItem
            label="Personal Reference 2"
            value={tenantDetails.personal_reference_2_name}
          />
          <InfoItem
            label="Reference 2 Phone"
            value={tenantDetails.personal_reference_2_phone}
          />
          <InfoItem
            label="Reference 2 Relation"
            value={tenantDetails.personal_reference_2_relation}
          />
        </div>
        {tenantDetails.additional_notes && (
          <div className="mt-4">
            <h3 className="font-semibold">Additional Notes:</h3>
            <p>{tenantDetails.additional_notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const InfoItem: React.FC<{ label: string; value: string | null }> = ({
  label,
  value,
}) => (
  <div>
    <span className="font-semibold">{label}:</span> {value || "N/A"}
  </div>
);

export default TenantDetailsCard;
