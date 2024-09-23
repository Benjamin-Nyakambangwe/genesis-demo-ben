import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

const AuthButton = () => {
  return (
    <Link href="/auth/login">
      <Button className="bg-[#344E41] border-[#344E41] text-[#DAD7CD] font-bold hover:bg-grey-900 rounded-full">
        Login{" "}
        <CircleUserRound className="ml-2 h-4 w-4 text-[#DAD7CD] font-bold" />
      </Button>
    </Link>
  );
};

export default AuthButton;
