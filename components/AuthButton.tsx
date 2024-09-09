import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

const AuthButton = () => {
  return (
    <Link href="/auth/login">
      <Button className=" bg-red-600 text-white hover:bg-grey-900 rounded-full">
        Login <CircleUserRound className="ml-2 h-4 w-4 text-white" />
      </Button>
    </Link>
  );
};

export default AuthButton;
