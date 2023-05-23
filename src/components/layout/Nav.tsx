import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-blue-700/80 text-white shadow-md ">
      <Link href="/" className="font-extrabold text-2xl">
        JM
      </Link>
      <nav className="flex items-center space-x-4">
        {session?.user ? (
          <>
            <Link href="/admin" className="hover:text-gray-200">
              Admin
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700"
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
