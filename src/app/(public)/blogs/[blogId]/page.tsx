import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";
import { getBlogById } from "@/services/PostServices";
import { IBlog } from "@/types";
import { Metadata } from "next";

import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}): Promise<Metadata> => {
  const { blogId } = await params;

  const blog: IBlog = await getBlogById(blogId);

  return {
    title: blog?.title,
    description: blog?.content,
  };
};

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`);
  const { data: blogs }: { data: IBlog[] } = await res.json();
  return blogs.slice(0, 2).map((blog) => ({
    blogId: String(blog.id),
  }));
};

const BlogDeatailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;

  const blog: IBlog = await getBlogById(blogId);

  //================Metadata===============

  return (
    <div>
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDeatailsPage;
