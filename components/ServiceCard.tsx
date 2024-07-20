import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface ServiceCardProps {
  data: {
    img: string;
    title: string;
    description: string;
    action: string;
  };
}

export default function ServiceCard({ data }: ServiceCardProps) {
  return (
    <Card className="w-[280px] md:w-[350px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-2">
      <div className="relative h-48 flex items-center justify-center">
        <Image
          src={data.img}
          alt="hero"
          width={180}
          height={180}
          className="object-contain"
        />
      </div>
      <CardContent className="pt-4">
        <div className="mb-4">
          <h5 className="text-center text-xl font-bold mt-1">{data.title}</h5>
          <h4 className="text-sm text-gray-600 mt-1">{data.description}</h4>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          className="h-8 w-full text-red-600 border-red-600"
        >
          {data.action}
        </Button>
      </CardFooter>
    </Card>
  );
}
