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

interface Landlord {
  date_of_birth: string | null;
  phone: string;
  alternate_phone: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  additional_notes: string;
  is_profile_complete: boolean;
  is_verified: boolean;
  last_updated: string;
  id_image: string;
  profile_image: string;
  id_number: string;
  proof_of_residence: string;
  marital_status: string;
}

export default function LandlordProfileCompletion({
  landlordData,
}: {
  landlordData: Landlord;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const tasks = [
    {
      id: 1,
      name: "Upload profile picture",
      completed: Boolean(landlordData.profile_image),
    },
    {
      id: 2,
      name: "Upload ID document",
      completed: Boolean(landlordData.id_image),
    },
    {
      id: 3,
      name: "Add ID number",
      completed: Boolean(landlordData.id_number),
    },
    {
      id: 4,
      name: "Upload proof of residence",
      completed: Boolean(landlordData.proof_of_residence),
    },
    {
      id: 5,
      name: "Add date of birth",
      completed: Boolean(landlordData.date_of_birth),
    },
    {
      id: 6,
      name: "Add phone number",
      completed: Boolean(landlordData.phone),
    },
    {
      id: 7,
      name: "Add alternate phone",
      completed: Boolean(landlordData.alternate_phone),
    },
    {
      id: 8,
      name: "Add emergency contact name",
      completed: Boolean(landlordData.emergency_contact_name),
    },
    {
      id: 9,
      name: "Add emergency contact phone",
      completed: Boolean(landlordData.emergency_contact_phone),
    },
    {
      id: 10,
      name: "Add marital status",
      completed: Boolean(landlordData.marital_status),
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
                <div key={task.id} className="flex items-center gap-3 text-[#344E41]">
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
