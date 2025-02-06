import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-bold text-pink-700">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 text-center">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded mt-5 bg-pink-600 px-10 py-3 text-white hover:bg-pink-700 transition-all duration-200 cursor-pointer"
      >
        GO TO HOME
      </Link>
    </div>
  );
};

export default NotFoundPage;
