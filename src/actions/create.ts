"use server";

import { IBlog } from "@/types";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const create = async (data: FormData) => {
  const blogData = Object.fromEntries(data.entries());
  const modifiedData: Partial<IBlog> = {
    ...blogData,
    authorId: 1,
    tags: blogData.tags
      .toString()
      .split(",")
      .map((tag) => tag.trim()),
    isFeatured: Boolean(blogData.isFeatured === "true"),
  };

  console.log(modifiedData);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });
  console.log(modifiedData);
  console.log(res);
  const result = await res.json();
  console.log(result);
  if (result?.id) {
    revalidateTag("BLOG");
    redirect("/");
  }

  return result;
};
