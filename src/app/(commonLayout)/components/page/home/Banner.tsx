import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative w-full h-[230px] lg:h-[450px] mt-6">
      {/* Background Image using Image component */}
      <div className="absolute inset-0 opacity-75">
        <Image
          src="/assets/banner-pb.webp"
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      {/* Text Section */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6 bg-black bg-opacity-50">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl text-opacity-100">
            Welcome to <span className="text-red-600">P</span>
            <span className="text-blue-600">e</span>
            <span className="text-green-600">t</span>
            <span className="text-yellow-600">B</span>
            <span className="text-indigo-600">h</span>
            <span className="text-purple-600">a</span>
            <span className="text-pink-600">n</span>
            <span className="text-teal-600">d</span>
            <span className="text-orange-600">a</span>
            <span className="text-gray-600">r</span>
          </h1>

          <p className="mt-4 text-lg font-semibold sm:text-xl">
            Discover products that bring your pet’s dreams to life at
            PetBhandar.
          </p>
          <Link href="/products">
            <button className="rounded bg-pink-600 px-6 py-3 text-white hover:bg-pink-700 transition-all duration-200 cursor-pointer">
              Explore Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
