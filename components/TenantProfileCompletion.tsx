"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ChevronDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Tenant {
  date_of_birth: string | null;
  gender: string;
  phone: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  occupation: string;
  employer: string;
  work_phone: string;
  preferred_lease_term: string | null;
  max_rent: number | null;
  preferred_move_in_date: string | null;
  preferred_area: string;
  number_of_occupants: number | null;
  pets: boolean;
  pet_details: string;
  smoker: boolean;
  has_vehicle: boolean;
  num_of_vehicles: number | null;
  criminal_record: boolean;
  personal_reference_1_name: string;
  personal_reference_1_phone: string;
  personal_reference_1_relation: string;
  personal_reference_2_name: string;
  personal_reference_2_phone: string;
  personal_reference_2_relation: string;
  additional_notes: string;
  id_image: string;
  profile_image: string;
  id_number: string;
  proof_of_employment: string;
  marital_status: string;
  is_profile_complete: boolean;
}

export default function TenantProfileCompletion({
  tenantData,
}: {
  tenantData: Tenant;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const tasks = [
    {
      id: 1,
      name: "Upload profile picture",
      completed: Boolean(tenantData.profile_image),
    },
    {
      id: 2,
      name: "Upload ID document",
      completed: Boolean(tenantData.id_image),
    },
    {
      id: 3,
      name: "Add ID number",
      completed: Boolean(tenantData.id_number),
    },
    {
      id: 4,
      name: "Upload proof of employment",
      completed: Boolean(tenantData.proof_of_employment),
    },
    {
      id: 5,
      name: "Add date of birth",
      completed: Boolean(tenantData.date_of_birth),
    },
    {
      id: 6,
      name: "Add gender",
      completed: Boolean(tenantData.gender),
    },
    {
      id: 7,
      name: "Add phone number",
      completed: Boolean(tenantData.phone),
    },
    {
      id: 8,
      name: "Add emergency contact name",
      completed: Boolean(tenantData.emergency_contact_name),
    },
    {
      id: 9,
      name: "Add emergency contact phone",
      completed: Boolean(tenantData.emergency_contact_phone),
    },
    {
      id: 10,
      name: "Add occupation",
      completed: Boolean(tenantData.occupation),
    },
    {
      id: 11,
      name: "Add employer",
      completed: Boolean(tenantData.employer),
    },
    {
      id: 12,
      name: "Add work phone",
      completed: Boolean(tenantData.work_phone),
    },
    {
      id: 13,
      name: "Add preferred lease term",
      completed: Boolean(tenantData.preferred_lease_term),
    },
    {
      id: 14,
      name: "Add maximum rent",
      completed: Boolean(tenantData.max_rent),
    },
    {
      id: 15,
      name: "Add preferred move-in date",
      completed: Boolean(tenantData.preferred_move_in_date),
    },
    {
      id: 16,
      name: "Add preferred area",
      completed: Boolean(tenantData.preferred_area),
    },
    {
      id: 17,
      name: "Add number of occupants",
      completed: Boolean(tenantData.number_of_occupants),
    },
    {
      id: 18,
      name: "Add first reference name",
      completed: Boolean(tenantData.personal_reference_1_name),
    },
    {
      id: 19,
      name: "Add first reference phone",
      completed: Boolean(tenantData.personal_reference_1_phone),
    },
    {
      id: 20,
      name: "Add first reference relation",
      completed: Boolean(tenantData.personal_reference_1_relation),
    },
    {
      id: 21,
      name: "Add second reference name",
      completed: Boolean(tenantData.personal_reference_2_name),
    },
    {
      id: 22,
      name: "Add second reference phone",
      completed: Boolean(tenantData.personal_reference_2_phone),
    },
    {
      id: 23,
      name: "Add second reference relation",
      completed: Boolean(tenantData.personal_reference_2_relation),
    },
  ];

  const completedTasks = tasks.filter((task) => task.completed);
  const completionPercentage = (completedTasks.length / tasks.length) * 100;

  return (
    <Card className="w-full mx-auto mt-4">
      <CardHeader>
        <CardTitle>Profile Completion</CardTitle>
        <CardDescription>
          Complete these to improve your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-[#344E41]">
                {completionPercentage.toFixed(0)}%
              </span>
            </div>
            <div className="relative">
              <Progress
                value={completionPercentage}
                className="w-full [&>div]:bg-[#344E41]"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-0 h-auto text-[#344E41]"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-controls="task-list"
              >
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
                <span className="sr-only">
                  {isExpanded ? "Hide" : "Show"} task list
                </span>
              </Button>
            </div>
          </div>
          <div
            id="task-list"
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "max-h-[300px]" : "max-h-0"
            }`}
          >
            <div className="overflow-y-auto pr-2 space-y-4 max-h-[300px] scrollbar-thin scrollbar-thumb-[#344E41] scrollbar-track-gray-100">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 text-[#344E41]"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-[#344E41] flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <span
                    className={
                      task.completed ? "text-muted-foreground line-through" : ""
                    }
                  >
                    {task.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
