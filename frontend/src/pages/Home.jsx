import BestSellingProducts from "../components/Home/BestSellingProducts";
import HeroSection from "../components/Home/HeroSection";
import PromotionalBanners from "../components/Home/PromotionalBanners";
import ShopByCategory from "../components/Home/ShopByCategory";



const Home = () => {
  return (
    <main >
      <HeroSection />
      <BestSellingProducts />
      <ShopByCategory/>
      <PromotionalBanners/>
    </main>
  );
};

export default Home;
