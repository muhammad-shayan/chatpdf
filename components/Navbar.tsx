import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="flex h-full items-center justify-between border-b border-zinc-200 mx-auto max-w-screen-xl px-2.5 md:px-20">
        <Link href="/" className="font-semibold">
          Quill.
        </Link>

        <MobileNav isAuth={!!user} />

        <div className="hidden sm:flex space-x-4 items-center">
          {!user ? (
            <>
              <Link
                href="/pricing"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Pricing
              </Link>
              <LoginLink
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Sign in
              </LoginLink>
              <RegisterLink className={buttonVariants({ size: "sm" })}>
                Get Started <ArrowRight className="ml-1.5 h-5 w-5" />
              </RegisterLink>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Dashboard
              </Link>
              <LogoutLink
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Logout
              </LogoutLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
