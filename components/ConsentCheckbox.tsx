"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function ConsentCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const submitButton = document.getElementById(
      "submit-button"
    ) as HTMLButtonElement;
    if (submitButton) {
      submitButton.disabled = !isChecked;
    }
  }, [isChecked]);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="consent"
        checked={isChecked}
        onCheckedChange={(checked) => setIsChecked(checked as boolean)}
      />
      <Label htmlFor="consent" className="text-sm">
        I agree to the{" "}
        <a href="/terms-of-service" className="text-[#344E41] underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy-policy" className="text-[#344E41] underline">
          Privacy Policy
        </a>
      </Label>
    </div>
  );
}
