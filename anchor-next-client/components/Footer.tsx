import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="">
      T Prajwal Prabhu
      <br />
      <Link href="https://github.com/prajwalprabhu/anchor-demo">
        <a className="text-gray-900">Github</a>
      </Link>
    </div>
  );
}

export default Footer;
