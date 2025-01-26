import Banner from "./(commonLayout)/components/page/home/Banner";
import FeaturedProducts from "./(commonLayout)/components/page/home/FeaturesProducts";
import Navbar from "./(commonLayout)/components/shared/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="mx-2">
        <Banner />
        <FeaturedProducts />
      </div>
    </div>
  );
}
