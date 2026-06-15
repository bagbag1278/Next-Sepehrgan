import BlogClient from "@/components/blog/Blog";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "بلاگ",
  description: "آخرین مقالات و اخبار حوزه اجاره ویلا، هتل و آپارتمان در رهن کده.",
  openGraph: {
    title: "بلاگ رهن کده",
    description: "آخرین مقالات و اخبار حوزه اجاره ویلا، هتل و آپارتمان.",
    type: "website",
  },
};
const Blog = () => {
  return (
    <>
      <BlogClient />
    </>
  );
};

export default Blog;
