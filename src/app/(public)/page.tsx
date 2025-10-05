import BlogCard from "@/components/modules/Blogs/BlogCard";
import Hero from "@/components/modules/Home/Hero";
import { IBlog } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "A simple blog built with Next.js, Tailwind CSS, and shadcn/ui.",
};

export default async function HomePage() {
  const res = await fetch(`${process.env.BASE_API}/post`, {
    next: {
      tags: ["BLOG"],
    },
  });
  const { data: blogs } = await res.json();

  return (
    <div>
      <Hero />
      <div className="container mx-auto">
        <h2 className="text-center mt-5 text-4xl">
          Featured Posts
          <div className="grid grid-cols-3 gap-8 mt-5 max-w-6xl mx-auto">
            {blogs.slice(0, 3).map((blog: IBlog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </h2>
      </div>
    </div>
  );
}
