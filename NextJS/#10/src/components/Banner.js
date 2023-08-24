import Image from "next/image";
import banner from "../assets/images/banner.png";
import facebook from "../assets/images/facebook.png";
import line from "../assets/images/line.png";
import instagram from "../assets/images/instagram.png";

export default function Banner({ title }) {
  return (
    <div className="banner">
      <Image className="banner-Image" src={banner} alt="banner" />
      <div className="main-text">
        <h1>{title}</h1>
        <div className="border">
            The search of life beyond Earth is one of the most exciting and challenging endeavors in modern science
        </div>
        <div className="tags">
          <p>Home</p>
          <p>—</p>
          <p>Blog</p>
          <p>—</p>
          <p>Details</p>
        </div>
      </div>
      <div className="socials">
        <Image src={line} alt="line" />
        <Image src={facebook} alt="facebook" />
        <Image src={instagram} alt="instagram" />
      </div>
    </div>
  );
}
