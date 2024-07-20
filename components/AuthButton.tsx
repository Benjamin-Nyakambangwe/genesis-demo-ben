import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";

const AuthButton = () => {
  return (
    <Button className="rounded-full border-grey-500 " variant="outline">
      Login <CircleUserRound className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default AuthButton;
