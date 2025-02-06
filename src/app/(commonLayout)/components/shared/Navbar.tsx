// components/Navbar/Navbar.tsx
import Link from "next/link";
import ProfileDropdown from "../../utils/ProfileDropdown";
import CartButton from "../../utils/CartButton";
import MobileSearchBar from "../../utils/SearchBarMobile"; // Mobile search bar
import DesktopSearchBar from "../../utils/SearchBarPc"; // Desktop search bar

const Navbar = () => {
  return (
    <>
      {/* Mobile Header */}
      <header className="bg-white text-[#1F2937] shadow-md md:hidden md:sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-3 py-2 lg:py-3">
          {/* Left Section: Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 lg:gap-2 text-2xl font-bold text-black"
          >
            <img
              src="/favicon.ico"
              alt="PetBhandar Logo"
              className="h-16 w-44"
            />
          </Link>

          {/* Right Section: Cart and Profile for Mobile */}
          <div className="flex items-center gap-2 ml-auto">
            <CartButton />
            <ProfileDropdown />
          </div>
        </div>
        <MobileSearchBar />
      </header>

      {/* Desktop Header */}
      <header className="bg-white shadow-md hidden md:block sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-3 py-2 lg:py-3">
          {/* Left Section: Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 lg:gap-2 text-2xl font-bold text-pink-600"
          >
            <img
              src="/favicon.ico"
              alt="PetBhandar Logo"
              className="h-16 w-44"
            />
          </Link>

          {/* Desktop Navbar Links */}
          <nav className="flex mx-auto gap-8 text-lg font-medium">
            <Link
              href="/"
              className="text-black hover:text-gray-200 transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-black hover:text-gray-200 transition"
            >
              Products
            </Link>
          </nav>

          {/* Right Section: Search, Cart, Profile for Desktop */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Desktop Search Bar */}
            <DesktopSearchBar />
            {/* Cart and Profile for Desktop */}
            <CartButton />
            <ProfileDropdown />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
