import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <Link href={"https://johnmwendwa.me"}>John Mwendwa</Link>
      </p>
    </footer>
  );
};

export default Footer;
