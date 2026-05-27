import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Spinner } from "@/components/ui/spinner";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoaded } = useUser();
  const mutate = useMutation(api.users.createUser);

  // we store user data if exist
  const storeUser = React.useCallback(async () => {
    if (!user && isLoaded) return;
    await mutate({
      email: user?.primaryEmailAddress?.emailAddress ?? "",
      name: user?.fullName ?? "",
      imgUrl: user?.imageUrl ?? "",
    });
  }, [user, isLoaded, mutate]);

  useEffect(() => {
    user && storeUser();
  }, [user, storeUser]);
 
  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
