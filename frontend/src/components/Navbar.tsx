import Link from "next/link";
import Container from "./Container";
import Title from "./Title";
import himakom from "@/logos/himakom.svg";
import omahti from "@/logos/omahti.svg";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <>
      <nav className="fixed z-[999]">
        <Container parentClass="py-4 w-screen bg-custom-black/90 backdrop-blur-md">
          <section className="flex w-full items-center justify-between">
            <Title link />
            <NavbarButtons />
            <NavbarSidebar className="block sm:hidden" />
          </section>
        </Container>
      </nav>

      {/* spacer */}
      <div className="h-20 w-full bg-custom-black"></div>
    </>
  );
};

// navbar buttons for larger screens
const NavbarButtons = ({ className }: { className?: string }) => {
  return (
    <div className={`hidden space-x-4 sm:flex ${className}`}>
      <Link href={`auth/login`}>
        <Button variant={`white`} size={`lg`}>
          Sign in
        </Button>
      </Link>
      <Link href={`auth/register`}>
        <Button variant={`whiteOutline`} size={`lg`}>
          Sign up
        </Button>
      </Link>
    </div>
  );
};

// sidebar for small screens
const NavbarSidebar = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Sheet>
        <div className="flex items-center justify-center">
          <SheetTrigger asChild>
            <Menu
              size={28}
              className="block transition-transform duration-500 animate-in fade-in hover:-rotate-180 sm:hidden"
            />
          </SheetTrigger>
        </div>

        <SheetContent
          className="border-l-0 p-0 text-custom-silver sm:hidden"
          side="right"
          // preventScroll={false}
        >
          {/* Close button positioned absolutely */}
          <div className="absolute right-4 top-5 z-50">
            <SheetClose className="rounded-full p-2 hover:bg-gray-100/10">
              <X
                size={28}
                className="text-custom-silver transition-transform duration-200 hover:rotate-180"
              />
            </SheetClose>
          </div>

          {/* wrapper for absolute positioning */}
          <div className="relative flex h-full w-full flex-col items-center justify-between px-6 py-[10vh]">
            {/* title omahti dan himakom */}
            <div className="z-20 w-full duration-300 animate-in slide-in-from-right">
              <SheetHeader className="text-start">
                <SheetTitle className="text-base font-semibold text-custom-silver">
                  {/* images himakom omahti */}
                  <div className="mb-2 flex gap-2">
                    <Image
                      src={himakom}
                      alt=""
                      className="h-8 w-auto"
                      priority
                    />
                    <Image
                      src={omahti}
                      alt=""
                      className="h-8 w-auto"
                      priority
                    />
                  </div>
                  Open Recruitment
                  <br />
                  Makomti 2025
                </SheetTitle>
              </SheetHeader>
            </div>

            {/* buttons */}
            <div className="z-20 flex w-full flex-col gap-4">
              <Link href="auth/login">
                <Button
                  className="w-full delay-100 duration-700 animate-in slide-in-from-right"
                  variant="white"
                  size="lg"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="auth/register">
                <Button
                  className="w-full bg-custom-black delay-150 duration-700 animate-in slide-in-from-right hover:bg-custom-black/80"
                  variant="whiteOutline"
                  size="lg"
                >
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* blue and orange background */}
            <div className="absolute bottom-1/2 left-0 right-0 top-0 z-0 bg-custom-blue duration-500 animate-in fade-in" />
            <div className="absolute bottom-0 left-0 right-0 top-1/2 z-0 bg-custom-orange duration-500 animate-in fade-in" />
            {/* black gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-custom-black via-custom-black/90 to-custom-black/80 duration-500 animate-in fade-in" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
