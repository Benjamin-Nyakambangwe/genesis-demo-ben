import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

const AuthButton = () => {
  return (
    <Link href="/auth/login">
      <Button className="rounded-full border-grey-500 " variant="outline">
        Login <CircleUserRound className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  );
};

export default AuthButton;
