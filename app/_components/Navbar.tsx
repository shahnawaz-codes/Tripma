"use client";
import { Button } from "@/components/ui/button";
import { Show, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MENU_LIST = [
  { name: "Home", path: "/" },
  { name: "My Trips", path: "/my-trips" },
  { name: "Pricing", path: "/pricing" },
];
function Navbar() {
  const path = usePathname();
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-white/80 backdrop-blur-md py-4 px-8 md:px-16 transition-all">
      {/* logo */}
      <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
        <Image src="/logo.svg" alt="logo" width={30} height={30} />
        <span className="text-2xl font-bold">Tripma</span>
      </Link>

      {/* menu list  */}
      <div className="hidden md:flex gap-6">
        {MENU_LIST.map((item, index) => {
          return (
            <Link href={item.path} key={index}>
              <h2 className="hover:text-primary font-semibold text-lg ">
                {item.name}
              </h2>
            </Link>
          );
        })}
      </div>
      <div className="flex gap-2 ">
        {/* Auth */}
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button className="bg-primary text-white p-2 w-36">
              Get Started
            </Button>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <UserButton />
          {path === "/create-new-trip" ? (
            <Link href={"/my-trips"}>
              <Button>My Trips</Button>
            </Link>
          ) : (
            <Link href={"/create-new-trip"}>
              <Button>Create Trip</Button>
            </Link>
          )}
        </Show>
      </div>
    </div>
  );
}

export default Navbar;
