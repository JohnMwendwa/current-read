import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <header>
      <Link href="/">JM</Link>
      <nav>
        <Link href={"/api/auth/signin"}>Login</Link>
      </nav>
    </header>
  );
};

export default Nav;
