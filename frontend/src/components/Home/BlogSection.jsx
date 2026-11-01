
import { Link } from "react-router-dom";
import { ArrowRight, Clock3 } from "lucide-react";

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
    <section className="py-14 sm:py-18 ">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Latest Blog Posts
            </h2>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Tips, trends and guides to help you live better.
            </p>
          </div>

          <Link
            to="/blogs"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <span className="hidden sm:inline">View All Posts</span>
            <span className="sm:hidden">View All</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog) => (
            <Link
              to={`/blogs/${blog.slug}`}
              key={blog.id}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
            >
              {/* Blog Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Category Badge */}
                <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
                  {blog.category}
                </span>
              </div>

              {/* Blog Details */}
              <div className="p-4">
                <h3 className="line-clamp-2 min-h-12 text-base font-semibold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-emerald-700">
                  {blog.title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span>{blog.publishedAt}</span>

                  <span className="h-1 w-1 rounded-full bg-slate-300" />

                  <span className="inline-flex items-center gap-1">
                    <Clock3 size={13} />
                    {blog.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
