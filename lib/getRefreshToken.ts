"use server";
import { cookies } from "next/headers";
import { updateAccess } from "./auth";

export async function getRefreshToken() {
  const refresh = cookies().get("refresh")?.value;

  await updateAccess(refresh);
  return refresh;
}
