// app/actions/submitFormAction.ts
"use server";

import { cookies } from "next/headers";

export async function submitMessageAction(receiver: string, content: string) {
  const token = cookies().get("access")?.value;
  // console.log("Receiver", formData.get("receiver") as string);
  // console.log("Content", content);

  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  const formData = new FormData();
  formData.append("receiver", receiver.get("receiver") as string);
  formData.append("content", receiver.get("message") as string);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(
      "http://127.0.0.1:8000/api/messages/",
      requestOptions
    );
    const data = await res.text();
    console.log(data);
    if (res.status === 201) {
      return { success: true, message: "Success" };
    } else {
      return { success: false, message: "Failed" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "An error occurred" };
  }
}
