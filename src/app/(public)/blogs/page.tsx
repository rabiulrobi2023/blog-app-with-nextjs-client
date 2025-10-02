import BlogCard from "@/components/modules/Blogs/BlogCard";
import { IBlog } from "@/types";

const AllBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    cache: "no-store",
  });
  const { data: blogs } = await res.json();
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl mb-4">All Blogs</h2>
      <div className="grid grid-cols-3 gap-5">
        {blogs?.map((blog: IBlog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogsPage;
