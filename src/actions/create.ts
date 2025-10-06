"use server";

import { getUserSession } from "@/helpers/userSession";
import { IBlog } from "@/types";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const create = async (data: FormData) => {
  const session = await getUserSession();
  const blogData = Object.fromEntries(data.entries());
  const modifiedData: Partial<IBlog> = {
    ...blogData,
    authorId: Number(session?.user.id),
    tags: blogData.tags
      .toString()
      .split(",")
      .map((tag) => tag.trim()),
    isFeatured: Boolean(blogData.isFeatured === "true"),
  };

  const res = await fetch(`${process.env.BASE_API}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });

  const result = await res.json();

  if (result?.id) {
    revalidateTag("BLOG");
    redirect("/");
  }

  return result;
};
