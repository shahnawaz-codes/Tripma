"use client";
import { Button } from "@/components/ui/button";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const MENU_LIST = [
  { name: "Home", path: "/" },
  { name: "My Trips", path: "/my-trips" },
  { name: "Pricing", path: "/pricing" },
];

function Navbar() {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md py-4 px-4 md:px-16 transition-all">
      {/* logo */}
      <Link href={"/"} className="flex items-center gap-2 cursor-pointer shrink-0">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <span className="text-xl md:text-2xl font-bold">Tripma AI</span>
      </Link>

      {/* menu list (Desktop) */}
      <div className="hidden md:flex gap-6">
        {MENU_LIST.map((item, index) => {
          return (
            <Link href={item.path} key={index}>
              <h2 className={`hover:text-primary font-semibold text-lg transition-colors ${
                path === item.path ? "text-primary font-bold" : "text-neutral-700 dark:text-neutral-300"
              }`}>
                {item.name}
              </h2>
            </Link>
          );
        })}
      </div>

      {/* Auth / Buttons (Desktop) */}
      <div className="hidden md:flex items-center gap-3">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button className="bg-primary text-white p-2 w-36 cursor-pointer">
              Get Started
            </Button>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <UserButton />
          {path === "/create-new-trip" ? (
            <Link href={"/my-trips"}>
              <Button className="cursor-pointer">My Trips</Button>
            </Link>
          ) : (
            <Link href={"/create-new-trip"}>
              <Button className="cursor-pointer">Create Trip</Button>
            </Link>
          )}
        </Show>
      </div>

      {/* Mobile Toggle & User Button (Mobile) */}
      <div className="md:hidden flex items-center gap-3">
        <Show when="signed-in">
          <UserButton />
        </Show>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 right-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-lg px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200 md:hidden z-40">
          <div className="flex flex-col gap-3">
            {MENU_LIST.map((item, index) => {
              return (
                <Link
                  href={item.path}
                  key={index}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <h2 className={`font-semibold text-lg py-2 hover:text-primary transition-colors ${
                    path === item.path ? "text-primary font-bold" : "text-neutral-750 dark:text-neutral-205"
                  }`}>
                    {item.name}
                  </h2>
                </Link>
              );
            })}
          </div>

          <hr className="border-neutral-100 dark:border-neutral-800 my-1" />

          <div className="flex flex-col gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button className="bg-primary text-white w-full py-6 font-semibold cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Button>
              </SignInButton>
            </Show>

            <Show when="signed-in">
              {path === "/create-new-trip" ? (
                <Link href={"/my-trips"} onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                  <Button className="w-full py-6 font-semibold cursor-pointer">My Trips</Button>
                </Link>
              ) : (
                <Link href={"/create-new-trip"} onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                  <Button className="w-full py-6 font-semibold cursor-pointer">Create Trip</Button>
                </Link>
              )}
            </Show>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
