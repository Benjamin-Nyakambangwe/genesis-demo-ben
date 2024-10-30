"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Component({
  commentId,
  userToken,
  like_count,
  dislike_count,
}) {
  const [likes, setLikes] = useState(like_count);
  const [dislikes, setDislikes] = useState(dislike_count);
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  const handleLike = async () => {
    console.log("LIKE BUTTON CLICKED", userToken);
    const myHeaders = new Headers();
    myHeaders.append("Cookie", `access=${userToken}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${commentId}/like/`,
      requestOptions
    );
    const data = await res.text();
    console.log(data);
    setLikes(likes + 1);
    setLikeActive(true);
    setDislikeActive(false);
  };

  const handleDislike = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", `access=${userToken}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${commentId}/dislike/`,
      requestOptions
    );
    const data = await res.text();
    setDislikes(dislikes + 1);
    setDislikeActive(true);
    setLikeActive(false);
  };

  return (
    <Card className="w-[50%] max-w-sm rounded-full overflow-hidden h-12">
      <CardContent className="flex items-center justify-between p-0">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center space-x-2 rounded-l-full px-4 py-6 transition-colors ${
            likeActive ? "text-green-500" : "text-gray-500 hover:text-green-500"
          }`}
          onClick={handleLike}
        >
          <ThumbsUp className="h-5 w-5" />
          <Badge variant="secondary" className="bg-transparent">
            <p className="text-sm">{likes}</p>
          </Badge>
        </Button>
        <div className="h-8 w-px bg-gray-200" />
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center space-x-2 rounded-r-full px-4 py-6 transition-colors ${
            dislikeActive ? "text-red-500" : "text-gray-500 hover:text-red-500"
          }`}
          onClick={handleDislike}
        >
          <ThumbsDown className="h-5 w-5" />
          <Badge variant="secondary" className="bg-transparent">
            <p className="text-sm">{dislikes}</p>
          </Badge>
        </Button>
      </CardContent>
    </Card>
  );
}
