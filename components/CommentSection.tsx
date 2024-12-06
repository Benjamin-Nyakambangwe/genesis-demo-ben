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
  MessageSquare,
} from "lucide-react";
import CommentsLikeDislike from "./CommentsLikeDislike";

interface Reply {
  id: number;
  content: string;
  created_at: string;
  commenter: string;
  is_owner: boolean;
}

interface Comment {
  id: number;
  tenant: string;
  created_at: string;
  content: string;
  is_owner: boolean;
  commenter: string;
  like_count: number;
  dislike_count: number;
  replies: Reply[];
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
  createReply: (
    replyContent: string,
    commentId: number,
    propertyId: string
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
  createReply,
  currentUser,
  userToken,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [expandedReplies, setExpandedReplies] = useState<number[]>([]);

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
      replies: [],
    };
    setComments([...comments, newComment]);
    setContent("");
    setLoading(false);
  };

  const handleReply = async (commentId: number) => {
    await createReply(replyContent, commentId, propertyId);
    // Add reply logic here
    const newReply: Reply = {
      id: Date.now(),
      content: replyContent,
      created_at: new Date().toISOString(),
      commenter: currentUser.first_name + " " + currentUser.last_name,
      is_owner: isLandlord,
    };

    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      })
    );

    setReplyContent("");
    setReplyingTo(null);
  };

  const toggleReplies = (commentId: number) => {
    setExpandedReplies((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  if (comments.length === 0 && !isExpanded) {
    return (
      <div className="flex items-center justify-between p-4">
        <p className="text-gray-600">No comments available</p>
        <button
          onClick={() => setIsExpanded(true)}
          className="text-[#344E41] hover:text-[#A3B18A] transition-colors"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-4">
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
      </div>

      {isExpanded && (
        <>
          <div className="flex-grow overflow-y-auto pr-2 mb-4">
            <div className="space-y-4">
              {comments
                .filter((comment: Comment) => !comment.is_reply)
                .map((comment) => (
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

                    <div className="flex items-center gap-4">
                      <CommentsLikeDislike
                        commentId={comment.id}
                        userToken={userToken}
                        like_count={comment.like_count}
                        dislike_count={comment.dislike_count}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(comment.id)}
                        className="text-[#344E41] hover:text-[#A3B18A]"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <div className="mt-2 pl-4 border-l-2 border-[#344E41]">
                        <Textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write a reply..."
                          className="min-h-[100px] focus-visible:ring-[#344E41]"
                        />
                        <div className="flex gap-2 mt-2">
                          <Button
                            onClick={() => handleReply(comment.id)}
                            className="bg-[#344E41] hover:bg-[#A3B18A]"
                          >
                            Reply
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies?.length > 0 && (
                      <div className="mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleReplies(comment.id)}
                          className="text-[#344E41] hover:text-[#A3B18A]"
                        >
                          {expandedReplies.includes(comment.id)
                            ? "Hide"
                            : "Show"}{" "}
                          Replies ({comment.replies.length})
                        </Button>

                        {expandedReplies.includes(comment.id) && (
                          <div className="pl-4 mt-2 space-y-2 border-l-2 border-[#344E41]">
                            {comment.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="bg-gray-50 p-2 rounded"
                              >
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-[#344E41]">
                                    {reply.commenter}
                                  </p>
                                  {reply.is_owner && (
                                    <>
                                      <BadgeCheck className="w-4 h-4 text-green-500" />
                                      <Badge variant="secondary">
                                        Verified Owner
                                      </Badge>
                                    </>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">
                                  {formatRelativeTime(reply.created_at)}
                                </p>
                                <p className="mt-1">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
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
              <Button
                type="submit"
                className="bg-[#344E41] hover:bg-[#A3B18A]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Add Comment"
                )}
              </Button>
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
