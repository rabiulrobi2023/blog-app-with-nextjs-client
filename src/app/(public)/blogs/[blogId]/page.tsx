import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";
import { IBlog } from "@/types";
import { Metadata } from "next";
import React from "react";

const BlogDeatailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`,
    {
      cache: "no-store",
    }
  );
  const blog: IBlog = await res.json();

  //================Metadata===============

  return (
    <div>
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDeatailsPage;
