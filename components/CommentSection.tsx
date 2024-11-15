"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatRelativeTime } from "@/utils/dateFormatter";
import { Badge } from "@/components/ui/badge";
import {
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  Loader2,
  SquarePlus,
} from "lucide-react";
import CommentsLikeDislike from "./CommentsLikeDislike";

interface Comment {
  id: number;
  tenant: string;
  created_at: string;
  content: string;
  is_owner: boolean;
  commenter: string;
  like_count: number;
  dislike_count: number;
}

interface CommentSectionProps {
  initialComments: Comment[];
  propertyId: string;
  tenant: { id: string; name: string } | null;
  user: any;
  property: any;
  createComment: (
    formData: FormData,
    propertyId: string,
    tenantId: string
  ) => Promise<void>;
  currentUser: any;
  userToken: string;
}

export default function CommentSection({
  initialComments,
  propertyId,
  tenant,
  user,
  property,
  createComment,
  currentUser,
  userToken,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const isLandlord = user?.user_id === property.owner.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!tenant && !isLandlord) return;

    const formData = new FormData();
    formData.append("content", content);

    await createComment(formData, propertyId, isLandlord.toString());

    const newComment: Comment = {
      id: Date.now(),
      tenant: tenant ? tenant.name : `${user.first_name} ${user.last_name}`,
      commenter: currentUser.first_name + " " + currentUser.last_name,
      created_at: new Date().toISOString(),
      content,
      is_owner: isLandlord,
      like_count: 0,
      dislike_count: 0,
    };
    setComments([...comments, newComment]);
    setContent("");
    setLoading(false);
  };

  if (comments.length == 0 && !isExpanded) {
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
      {/* <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Comments ({comments.length})</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#344E41] hover:text-[#A3B18A] transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6" />
          )}
        </button>
      </div> */}

      {(isExpanded || comments.length > 0) && (
        <>
          <div className="flex-grow overflow-y-auto pr-2 mb-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b pb-2 border-[#344E41]"
                >
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[#344E41]">
                      {comment.commenter}
                    </p>
                    {comment.is_owner && (
                      <>
                        <BadgeCheck className="w-4 h-4 text-green-500" />
                        <Badge variant="secondary">Verified Owner</Badge>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatRelativeTime(comment.created_at)}
                  </p>
                  <p className="mt-1 mb-1">{comment.content}</p>
                  <CommentsLikeDislike
                    commentId={comment.id}
                    userToken={userToken}
                    like_count={comment.like_count}
                    dislike_count={comment.dislike_count}
                  />
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add a comment....."
              className="focus-visible:ring-[#344E41] focus:border-0"
            />
            {tenant || isLandlord ? (
              loading ? (
                <Button
                  type="submit"
                  className="bg-[#344E41] hover:bg-[#A3B18A]"
                >
                  <Loader2 className="animate-spin mr-2" />
                  Submitting...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-[#344E41] hover:bg-[#A3B18A]"
                >
                  Add Comment
                </Button>
              )
            ) : (
              <Button disabled className="bg-gray-400 cursor-not-allowed">
                You must be the owner or a registered tenant to comment
              </Button>
            )}
          </form>
        </>
      )}
    </div>
  );
}
