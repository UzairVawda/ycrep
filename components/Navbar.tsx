import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}'s Profile</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button>Logout</button>
              </form>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>Login</DropdownMenuTrigger>
                <DropdownMenuContent className="mr-[.8rem] bg-primary-100 flex flex-col items-center justify-center">
                  <DropdownMenuLabel>
                    <form
                      action={async () => {
                        "use server";
                        // console.log("github");
                        await signIn("github");
                      }}
                    >
                      <button>Github</button>
                    </form>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Google</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
