import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center p-4 bg-gray-400">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <Link href={"https://johnmwendwa.me"}>John Mwendwa</Link>
      </p>
    </footer>
  );
};

export default Footer;
