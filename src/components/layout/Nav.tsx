import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  return (
    <header className="flex justify-between items-center px-4 py-6 bg-blue-700 text-white">
      <Link href="/" className="font-extrabold text-2xl">
        JM
      </Link>
      <nav className="flex items-center">
        {session?.user ? (
          <button
            onClick={() => signOut()}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-black px-4 py-2 rounded-lg hover:bg-gray-900"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Nav;
