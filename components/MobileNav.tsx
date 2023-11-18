"use client";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const closeOnCurrent = (href: string) => {
    if (pathname === href) toggleOpen();
  };

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);
  return (
    <div className="sm:hidden">
      {isOpen ? (
        <X
          onClick={toggleOpen}
          className="z-50 h-5 w-5 text-zinc-700 cursor-pointer"
        />
      ) : (
        <Menu
          onClick={toggleOpen}
          className="z-50 h-5 w-5 text-zinc-700 cursor-pointer"
        />
      )}
      {isOpen && (
        <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 top-14 z-0 w-full">
          <ul className="bg-white border-b border-zinc-200 shadow-xl w-full gap-3 px-10 p-8 grid">
            <>
              <li>
                <Link
                  href="/sign-up"
                  className="flex items-center font-semibold text-zinc-600"
                  onClick={() => closeOnCurrent("/sign-up")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </li>
              <li className="my-3 h-px w-full bg-gray-300" />
              <li>
                <Link
                  href="/sign-in"
                  className="flex items-center font-semibold text-zinc-600"
                  onClick={() => closeOnCurrent("/sign-in")}
                >
                  Sign In
                </Link>
              </li>
              <li className="my-3 h-px w-full bg-gray-300" />
              <li>
                <Link
                  href="/pricing"
                  className="flex items-center font-semibold text-zinc-600"
                  onClick={() => closeOnCurrent("/pricing")}
                >
                  Pricing
                </Link>
              </li>
            </>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
