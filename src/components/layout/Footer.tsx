import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center p-4">
      <p>
        &copy; <Link href={"https://johnmwendwa.vercel.app"}>John Mwendwa</Link>
        <span className="text-sm ml-1">{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default Footer;
