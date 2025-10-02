import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";
import React from "react";

const BlogDeatailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  console.log(blogId);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`,
    {
      cache: "no-store",
    }
  );
  const blog = await res.json();
  console.log(blog);
  return (
    <div>
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDeatailsPage;
