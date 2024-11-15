"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatRelativeTime } from "@/utils/dateFormatter";
import { SquarePlus, Star } from "lucide-react";
import { submitReviewAction } from "@/lib/submitReview";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: number;
  reviewer: string;
  reviewed: string;
  property: string;
  rating: number;
  created_at: string;
  comment: string;
}

interface ReviewSectionProps {
  propertyId: string;
  propertyOwner: any;
  property: {
    id: string;
    users_with_access: { id: number }[];
    // ... other property fields
  };
  // currentTenant: {
  //   id: number;
  //   // ... other tenant fields
  // } | null;
  userDetails: string | undefined;
}

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  readOnly = false,
}) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Star
            key={index}
            className={`h-6 w-6 ${
              ratingValue <= (hover || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            } ${!readOnly && "cursor-pointer"}`}
            onClick={() => !readOnly && onRatingChange(ratingValue)}
            onMouseEnter={() => !readOnly && setHover(ratingValue)}
            onMouseLeave={() => !readOnly && setHover(null)}
          />
        );
      })}
    </div>
  );
};

export default function ReviewSection({
  propertyId,
  propertyOwner,
  property,
  currentTenant,
  userDetails,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // const canAddReview =
  //   currentTenant &&
  //   property.tenants_with_access.some(
  //     (user) => user.id === currentTenant.user.id
  //   );

  let user;

  if (userDetails) {
    user = JSON.parse(userDetails);
  }
  // console.log("Property Details in Review Section:", property);
  // console.log("Tenant Details in Review Section:", currentTenant);
  // console.log("User Details in Review Section:", user);

  const canAddReview = property.tenants_with_access.some(
    (tenant: { id: number }) => tenant.id === user?.user_id
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await submitReviewAction(
      comment,
      rating,
      propertyOwner.id,
      property.id
    );

    if (result.success) {
      // alert("Review submitted successfully");
      toast.success("Review submitted successfully", {
        // description: "Please try again or contact support",
        duration: 5000,
        position: "top-right",
      });

      const newReview: Review = {
        id: Date.now(),
        reviewer: result.reviewerName, // Use the full name returned from the server
        reviewed: `test`,
        property: `test`,
        rating: rating,
        created_at: new Date().toISOString(),
        comment,
      };
      setReviews([...reviews, newReview]);
      setComment("");
      setRating(0);
    } else {
      // alert("Review submission failed");
      toast.error("Review submission failed", {
        description: "Please try again or contact support",
        duration: 5000,
        position: "top-right",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const getReviews = async () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow" as RequestRedirect,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties-reviews/${propertyId}`,
        requestOptions
      );
      const data = await res.json();

      setReviews(data);
      console.log(data);
    };
    getReviews();
  }, [propertyId]);

  console.log("Property Owner in Review Section:", propertyOwner);
  console.log("Property in Review Section:", property);

  const [isExpanded, setIsExpanded] = useState(false);

  if (reviews.length == 0 && !isExpanded) {
    return (
      <div className="flex items-center justify-between p-4 ">
        <p className="text-gray-600">No comments available</p>
        <button
          onClick={() => setIsExpanded(true)}
          className="text-[#344E41] flex items-center gap-2"
        >
          Add New
          <SquarePlus className="h-6 w-6 hover:text-[#A3B18A] transition-colors" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[400px]">
      {(isExpanded || reviews.length > 0) && (
        <>
          <div className="flex-grow overflow-y-auto pr-2 mb-4">
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-2 border-[#344E41]">
              <p className="font-semibold text-[#344E41]">
                {review.reviewer.first_name} {review.reviewer.last_name}
              </p>
              <StarRating rating={review.rating} readOnly={true} />
              <p className="text-sm text-gray-600">
                {formatRelativeTime(review.created_at)}
              </p>
              <p className="mt-1">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
      {canAddReview && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border-t-4 pt-2 border-[#344E41]"
        >
          <StarRating rating={rating} onRatingChange={setRating} />
          <Textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment....."
            className="focus-visible:ring-[#344E41] focus:border-0"
          />
          {loading ? (
            <Button type="submit" className="bg-[#344E41] hover:bg-[#A3B18A]">
              <Loader2 className="animate-spin mr-2" />
              Submitting...
            </Button>
          ) : (
            <Button type="submit" className="bg-[#344E41] hover:bg-[#A3B18A]">
              Add Review
            </Button>
          )}
        </form>
      )}
        </>
      )}
    </div>
  );
}
