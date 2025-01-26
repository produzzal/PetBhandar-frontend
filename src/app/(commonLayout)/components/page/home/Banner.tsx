import Image from "next/image";

const Banner = () => {
  return (
    <div className="mx-2">
      <div className="relative w-full h-[300px] lg:h-[450px] mt-6">
        {/* Background Image using Image component */}
        <div className="absolute inset-0">
          <Image
            src="/assets/banner.jpg"
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        {/* Text Section */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6 bg-black bg-opacity-50">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Welcome to <span className="text-blue-400">S</span>
              <span className="text-red-400">h</span>
              <span className="text-yellow-400">o</span>
              <span className="text-green-400">p</span>
              <span className="text-purple-400">n</span>
              <span className="text-pink-400">o</span>
              <span className="text-indigo-400">M</span>
              <span className="text-teal-400">e</span>
              <span className="text-orange-400">l</span>
              <span className="text-gray-400">a</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl">
              Discover products that bring your dreams to life.
            </p>
            <button className="mt-6 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-600">
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
