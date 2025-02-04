import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-bold text-blue-700">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 text-center">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded border-2 border-blue-700 px-4 py-2 text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-200"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
