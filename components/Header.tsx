"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthButton";
import { Button } from "./ui/button";
import LogoutButton from "./LogoutButton";
import { Menu, X } from "lucide-react";
import { getUnreadMessageCount } from "@/lib/getUnreadCount";

interface HeaderProps {
  token?: string;
}

const Header: React.FC<HeaderProps> = ({ token }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Fetch unread message count on component mount and periodically
  useEffect(() => {
    // if (!token) return; // Only fetch if user is logged in

    const fetchUnreadCount = async () => {
      try {
        const result = await getUnreadMessageCount();
        if (result.success) {
          setUnreadCount(result.unreadCount);
        }
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    // Fetch immediately on mount
    fetchUnreadCount();

    // Set up interval to fetch every 30 seconds
    const intervalId = setInterval(fetchUnreadCount, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [token]);

  const linkStyle = (href: string) => {
    const isActive = pathname === href;
    return `block py-2 px-3 rounded hover:bg-gray-100 hover:text-[#344E41] hover:font-bold md:hover:bg-transparent md:hover:text-[#344E41] md:p-0 md:dark:hover:text-red-600 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
      isActive
        ? "text-[#344E41] font-bold border-b-2 border-[#344E41] font-bold"
        : "text-gray-900"
    }`;
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src="/img/RO-JA.svg" width={120} height={45} alt="logo" />
        </Link>
        <div className="flex md:order-2">
          {token ? (
            <div className="flex justify-between">
              <Link href="/profile">
                <Button className="bg-[#344E41] text-[#DAD7CD] rounded-full hover:bg-[#A3B18A] relative">
                  Profile
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Button>
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <AuthButton />
          )}

          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/properties" className={linkStyle("/properties")}>
                All Listings
              </Link>
            </li>
            <li>
              <Link href="/my-listings" className={linkStyle("/my-listings")}>
                My Listings
              </Link>
            </li>
            <li>
              <Link href="/pricing" className={linkStyle("/pricing")}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/blog" className={linkStyle("/blog")}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className={linkStyle("/about")}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className={linkStyle("/contact")}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
