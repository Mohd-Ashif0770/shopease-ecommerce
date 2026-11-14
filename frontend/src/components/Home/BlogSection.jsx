import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Clock3 } from "lucide-react";
import { staggerContainer, staggerItem } from "../../utils/motion";

const blogs = [
  {
    id: 1,
    slug: "home-decor-ideas-cozy-living-room",
    category: "Lifestyle",
    title: "10 Home Decor Ideas for a Cozy Living Room",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80",
    publishedAt: "Feb 18, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    slug: "best-laptops-for-students",
    category: "Tech",
    title: "Best Laptops for Students in 2026",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80",
    publishedAt: "Jan 30, 2026",
    readTime: "7 min read",
  },
  {
    id: 3,
    slug: "summer-fashion-trends",
    category: "Fashion",
    title: "Summer Fashion Trends You'll Love This Year",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80",
    publishedAt: "Jan 15, 2026",
    readTime: "6 min read",
  },
  {
    id: 4,
    slug: "simple-fitness-tips-healthier-lifestyle",
    category: "Health",
    title: "Simple Fitness Tips for a Healthier Lifestyle",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
    publishedAt: "Jan 10, 2026",
    readTime: "5 min read",
  },
];

const BlogSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Latest Blog Posts
            </h2>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Tips, buying guides, and expert advice for smart shopping
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/blogs"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <span className="hidden sm:inline">View All Posts</span>
              <span className="sm:hidden">View All</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Blog Cards Staggered */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Link
                to={`/blogs/${blog.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/60"
              >
                {/* Blog Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />

                  {/* Category Badge */}
                  <span className="absolute left-3.5 top-3.5 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-xs font-bold text-emerald-800 shadow-xs backdrop-blur-md">
                    {blog.category}
                  </span>
                </div>

                {/* Blog Details */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-[#087443]">
                    {blog.title}
                  </h3>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                    <span>{blog.publishedAt}</span>

                    <span className="inline-flex items-center gap-1 font-medium">
                      <Clock3 size={13} className="text-emerald-600" />
                      {blog.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
