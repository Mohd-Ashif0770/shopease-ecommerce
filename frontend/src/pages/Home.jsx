import BestSellingProducts from "../components/Home/BestSellingProducts";
import BlogSection from "../components/Home/BlogSection";
import HeroSection from "../components/Home/HeroSection";
import PromotionalBanners from "../components/Home/PromotionalBanners";
import ShopByCategory from "../components/Home/ShopByCategory";
import Testimonials from "../components/Home/Testimonials";
import TrustedBrands from "../components/Home/TrustedBrands";
import AnimatedSection from "../components/motion/AnimatedSection";

const Home = () => {
  return (
    <main className="bg-slate-50">
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection>
        <BestSellingProducts />
      </AnimatedSection>
      <AnimatedSection>
        <ShopByCategory />
      </AnimatedSection>
      <AnimatedSection>
        <PromotionalBanners />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      <AnimatedSection>
        <TrustedBrands />
      </AnimatedSection>
      <AnimatedSection>
        <BlogSection />
      </AnimatedSection>
    </main>
  );
};

export default Home;
