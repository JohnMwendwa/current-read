import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-secondary text-white shadow-xl backdrop-blur-sm fixed top-0 right-0 left-0     z-10">
      <Link href="/" className="font-extrabold text-2xl">
        JM
      </Link>
      <nav className="flex items-center space-x-4">
        <Link
          href={"/wish-list"}
          className="bg-white hidden sm:inline-block text-black px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          Wish
        </Link>
        {session?.user ? (
          <>
            <Link
              href="/admin"
              className="bg-blue-700 px-4 py-2 rounded-lg hover:text-gray-200"
            >
              Admin
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-600 px-3 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-gray-900 px-4 py-2 rounded-lg hover:bg-cyan-900"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Nav;
