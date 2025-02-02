import Banner from "./(commonLayout)/components/page/home/Banner";
import FeaturedProducts from "./(commonLayout)/components/page/home/FeaturesProducts";
import Products from "./(commonLayout)/components/page/home/Products";

export default function Home() {
  return (
    <div>
      <div className="mx-2">
        <Banner />
        <FeaturedProducts />
        <Products />
      </div>
    </div>
  );
}
