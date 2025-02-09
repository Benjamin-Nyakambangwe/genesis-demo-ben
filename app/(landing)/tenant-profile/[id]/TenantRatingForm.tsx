"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { submitTenantRatingAction } from "@/lib/submitTenantRating";
import { Loader2, StarIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TenantRatingFormProps {
  tenantId: string;
}

export default function TenantRatingForm({ tenantId }: TenantRatingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      const result = await submitTenantRatingAction(formData);
      if (result.success) {
        toast.success("Rating submitted successfully");
        setComment(""); // Clear the comment
        const form = document.getElementById("rating-form") as HTMLFormElement;
        form?.reset();
        router.refresh(); // This will trigger a server revalidation
      } else {
        toast.error(result.message || "Failed to submit rating");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the rating");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center p-2 sm:p-4">Rate Tenant</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="rating-form" action={handleSubmit}>
          <input type="hidden" name="tenant" value={tenantId} />
          <input type="hidden" name="rating" value={selectedRating} />
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="mb-2">Rating</Label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none transition-transform hover:scale-110"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setSelectedRating(star)}
                  >
                    <StarIcon
                      className={`h-8 w-8 transition-colors duration-200 ${
                        star <= (hoveredRating || selectedRating)
                          ? "text-[#344E41] fill-[#344E41]"
                          : "text-gray-300"
                      } ${star <= hoveredRating ? "scale-110" : ""}`}
                    />
                  </button>
                ))}
              </div>
              {selectedRating > 0 && (
                <p className="text-center text-sm text-[#344E41] mt-2">
                  {selectedRating === 5
                    ? "Excellent"
                    : selectedRating === 4
                    ? "Very Good"
                    : selectedRating === 3
                    ? "Good"
                    : selectedRating === 2
                    ? "Fair"
                    : "Poor"}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Comment</Label>
              <Textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this tenant..."
                required
                className="min-h-[80px]"
              />
            </div>
          </div>
          <CardFooter className="flex flex-col items-center mt-4">
            <Button
              className="w-full bg-[#344E41] text-[#DAD7CD] hover:bg-[#A3B18A] rounded-full"
              type="submit"
              disabled={isSubmitting || selectedRating === 0}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Rating"
              )}
            </Button>
            <div>
              <p className="text-xs text-center mt-2">
                Your rating helps other landlords make informed decisions.
              </p>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
