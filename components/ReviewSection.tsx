"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatRelativeTime } from "@/utils/dateFormatter";
import { Star } from "lucide-react";

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
  property: any;
  createReview: (
    formData: FormData,
    propertyId: string,
    tenantId: string
  ) => Promise<void>;
}

const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
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
  createReview,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!property.tenant) return;

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("rating", rating.toString());
    await createReview(formData, propertyId, property.tenant.id);

    const newReview: Review = {
      id: Date.now(),
      reviewer: `${property.tenant.user.first_name} ${property.tenant.user.last_name}`,
      reviewed: "",
      property: "",
      rating: rating,
      created_at: new Date().toISOString(),
      comment,
    };
    setReviews([...reviews, newReview]);
    setComment("");
    setRating(0);
  };

  useEffect(() => {
    const getReviews = async () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow" as RequestRedirect,
      };

      const res = await fetch(
        `http://127.0.0.1:8000/api/properties-reviews/${propertyId}`,
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

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-grow overflow-y-auto pr-2 mb-4">
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-2 border-[#344E41]">
              <p className="font-semibold text-[#344E41]">{review.reviewer}</p>
              <StarRating rating={review.rating} readOnly />
              <p className="text-sm text-gray-600">
                {formatRelativeTime(review.created_at)}
              </p>
              <p className="mt-1">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <StarRating rating={rating} onRatingChange={setRating} />
        <Textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment....."
          className="focus-visible:ring-[#344E41] focus:border-0"
        />
        <Button type="submit" className="bg-[#344E41] hover:bg-[#A3B18A]">
          Add Review
        </Button>
      </form>
    </div>
  );
}
