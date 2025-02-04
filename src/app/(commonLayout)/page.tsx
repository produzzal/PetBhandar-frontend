import Banner from "./components/page/home/Banner";
import FeaturedCategories from "./components/page/home/FeaturesCategories";
import FeaturedProducts from "./components/page/home/FeaturesProducts";

export default function Home() {
  return (
    <div>
      <div className="mx-2">
        <Banner />
        <div className="mx-5">
          <FeaturedCategories />
          <FeaturedProducts />
        </div>
      </div>
    </div>
  );
}
