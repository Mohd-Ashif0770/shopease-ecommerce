import BestSellingProducts from "../components/Home/BestSellingProducts";
import HeroSection from "../components/Home/HeroSection";



const Home = () => {
  return (
    <main>
      <HeroSection />

      {/* Best Selling Products will come next */}
      <BestSellingProducts />
    </main>
  );
};

export default Home;
