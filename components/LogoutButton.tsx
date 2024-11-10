"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/logout";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await logout();
    if (result.success) {
      router.push("/");
      router.refresh();
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
      </Button>
    </form>
  );
};

export default LogoutButton;
