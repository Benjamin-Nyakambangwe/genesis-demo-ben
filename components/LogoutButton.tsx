import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

const LogoutButton = () => {
  return (
    <Link href="/auth/login">
      <Button className=" border-grey-500 ml-2 " variant="outline">
        Logout <CircleUserRound className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  );
};

export default LogoutButton;
