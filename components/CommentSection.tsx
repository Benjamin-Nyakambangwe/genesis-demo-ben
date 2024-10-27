"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatRelativeTime } from "@/utils/dateFormatter";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, BadgeBadgeCheck } from "lucide-react";

interface Comment {
  id: number;
  tenant: string;
  created_at: string;
  content: string;
  is_owner: boolean;
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
}

export default function CommentSection({
  initialComments,
  propertyId,
  tenant,
  user,
  property,
  createComment,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState("");

  console.log("TENANT IN COMMENT SECTION", tenant);
  console.log("USER IN COMMENT SECTION", user);
  console.log("PROPERTY IN COMMENT SECTION", property.owner.id);

  const isLandlord = user?.user_id === property.owner.id;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tenant && !isLandlord) return;

    const formData = new FormData();
    formData.append("content", content);
    await createComment(formData, propertyId, tenant.id);

    const newComment: Comment = {
      id: Date.now(),
      tenant: tenant ? tenant.name : `${user.first_name} ${user.last_name}`,
      created_at: new Date().toISOString(),
      content,
      is_owner: isLandlord,
    };
    setComments([...comments, newComment]);
    setContent("");
  };

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-grow overflow-y-auto pr-2 mb-4">
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-2 border-[#344E41]">
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
              <p className="mt-1">{comment.content}</p>
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
          <Button type="submit" className="bg-[#344E41] hover:bg-[#A3B18A]">
            Post Comment
          </Button>
        ) : (
          <Button disabled className="bg-gray-400 cursor-not-allowed">
            You must be the owner or a registered tenant to comment
          </Button>
        )}
      </form>
    </div>
  );
}
