import BestSellingProducts from "../components/Home/BestSellingProducts";
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
    </main>
  );
};

export default Home;
