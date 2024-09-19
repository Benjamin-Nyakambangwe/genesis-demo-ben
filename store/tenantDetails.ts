import { create } from "zustand";

interface TenantDetails {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  phone: string;
  date_of_birth: string;
  gender: string;
  occupation: string;
  employer: string;
  work_phone: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  preferred_lease_term: number;
  max_rent: number;
  preferred_move_in_date: string;
  preferred_area: string;
  number_of_occupants: number;
  pets: boolean;
  pet_details?: string;
  smoker: boolean;
  has_vehicle: boolean;
  num_of_vehicles?: number;
  criminal_record: boolean;
  personal_reference_1_name: string;
  personal_reference_1_phone: string;
  personal_reference_1_relation: string;
  personal_reference_2_name: string;
  personal_reference_2_phone: string;
  personal_reference_2_relation: string;
  additional_notes?: string;
  marital_status: string;
  id_number: string;
}

interface TenantDetailsState {
  tenantDetails: TenantDetails | null;
  updateTenantDetails: (details: TenantDetails) => void;
}

export const useTenantDetailsStore = create<TenantDetailsState>((set) => ({
  tenantDetails: null,
  updateTenantDetails: (details) => set({ tenantDetails: details }),
}));
