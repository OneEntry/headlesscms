import Link from "next/link";
import logo from "../assets/images/logo.png";
import Image from "next/image";

export default function Header({ pages }) {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Image src={logo} alt="" />
        </div>
        <div className="menu">
          {pages.map((page, index) => (
            <Link
              className="menu-item"
              key={index}
              href={page.pageUrl === "home" ? "/" : page.pageUrl}
            >
              {page.localizeInfos.en_US.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
