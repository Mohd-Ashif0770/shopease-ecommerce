import BestSellingProducts from "../components/Home/BestSellingProducts";
import BlogSection from "../components/Home/BlogSection";
import HeroSection from "../components/Home/HeroSection";
import PromotionalBanners from "../components/Home/PromotionalBanners";
import ShopByCategory from "../components/Home/ShopByCategory";
import Testimonials from "../components/Home/Testimonials";
import TrustedBrands from "../components/Home/TrustedBrands";



const Home = () => {
  return (
    <main className="bg-slate-50" >
      <HeroSection />
      <BestSellingProducts />
      <ShopByCategory/>
      <PromotionalBanners/>
      <Testimonials/>
      <TrustedBrands/>
      <BlogSection/>
    </main>
  );
};

export default Home;
