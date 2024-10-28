// app/actions/submitFormAction.ts
"use server";

import { cookies } from "next/headers";

// export async function submitMessageAction(receiver: string, content: string) {
//   const token = cookies().get("access")?.value;
//   // console.log("Receiver", formData.get("receiver") as string);
//   // console.log("Content", content);

//   const myHeaders = new Headers();
//   myHeaders.append("Cookie", `access=${token}`);

//   const formData = new FormData();
//   formData.append("receiver", receiver.get("receiver") as string);
//   formData.append("content", receiver.get("message") as string);

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: formData,
//     redirect: "follow" as RequestRedirect,
//   };

export async function submitMessageAction(formData: FormData) {
  const token = cookies().get("access")?.value;
  const myHeaders = new Headers();
  myHeaders.append("Cookie", `access=${token}`);

  // Get values from the input FormData
  const receiver = formData.get("receiver") as string;
  const content = formData.get("message") as string;

  // Rename this to avoid the naming conflict
  const submitData = new FormData();
  submitData.append("receiver", receiver);
  submitData.append("content", content);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: submitData,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/`,
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
