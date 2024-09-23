import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { logout } from "@/lib/logout";
import { redirect } from "next/navigation";

const LogoutButton = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await logout();
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        className=" border-[#344E41] text-[#344E41] ml-2 rounded-full font-bold border-2"
        variant="outline"
      >
        Logout{" "}
        <CircleUserRound className="ml-2 h-4 w-4 text-[#344E41] font-bold" />
      </Button>
    </form>
  );
};

export default LogoutButton;
