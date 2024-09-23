"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatRelativeTime } from "@/utils/dateFormatter";

interface Comment {
  id: number;
  tenant: string;
  created_at: string; // Change this from 'date' to 'created_at'
  content: string;
}

interface CommentSectionProps {
  initialComments: Comment[];
  propertyId: string;
  tenant: { id: string; name: string } | null;
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
  createComment,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tenant) return;

    const formData = new FormData();
    formData.append("content", content);
    await createComment(formData, propertyId, tenant.id);

    const newComment: Comment = {
      id: Date.now(),
      tenant: tenant.user.first_name + " " + tenant.user.last_name,
      created_at: new Date().toISOString(),
      content,
    };
    setComments([...comments, newComment]);
    setContent("");
  };

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-grow overflow-y-auto pr-2 mb-4">
        <div className="space-y-4">
          {comments.map((comment) => {
            console.log("Comment date:", comment.created_at); // This line is fine now
            return (
              <div key={comment.id} className="border-b pb-2 border-[#344E41]">
                <p className="font-semibold text-[#344E41]">{comment.tenant}</p>
                <p className="text-sm text-gray-600">
                  {formatRelativeTime(comment.created_at)}
                </p>
                <p className="mt-1">{comment.content}</p>
              </div>
            );
          })}
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
        {tenant ? (
          <Button type="submit" className="bg-[#344E41] hover:bg-[#A3B18A]">
            Post Comment
          </Button>
        ) : (
          <Button disabled className="bg-gray-400 cursor-not-allowed">
            You must be a registered tenant to comment
          </Button>
        )}
      </form>
    </div>
  );
}
