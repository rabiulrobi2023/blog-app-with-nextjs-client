// export const getAllBlog = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`);
//   return await res.json();
// };

export const getBlogById = async (blogId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`);
  return await res.json();
};
