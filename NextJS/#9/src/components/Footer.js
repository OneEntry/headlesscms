import arrow from "../assets/images/arrow.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="inner-container">
        <div className="container">
          <div className="column">
            <h4>Contact Info</h4>
            <div className="address">
              <h5>Address</h5>
              <p>
                258C, South City, Main town <br />
                Brolex Tower, New York
              </p>
            </div>
            <div className="address phone">
              <h5>Phone</h5>
              <p>+02154 785 654</p>
              <p>+98745 852 147</p>
            </div>
            <div className="address phone">
              <h5>Web</h5>
              <p>info@example.com</p>
              <p>www.example.com</p>
            </div>
          </div>
          <div className="column">
            <h4>Quick Link</h4>
            <ul>
              <li>
                <Image src={arrow} alt="arrow" />
                About us
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                Our Experts{" "}
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                Support{" "}
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                Contact
              </li>
            </ul>
          </div>
          <div className="column">
            <h4>Information</h4>
            <ul>
              <li>
                <Image src={arrow} alt="arrow" />
                About us
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                Our Experts{" "}
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                Support{" "}
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                Contact
              </li>
            </ul>
          </div>
          <div className="column">
            <h4>Opening Hour</h4>
            <div className="opening">
              <p>
                <b>Monday to Friday</b>
              </p>
              <p>9.00 am - 10.30 Pm </p>
              <p>
                <b>Saturday to Sunday</b>
              </p>
              <p>11.00 am - 9.30 Pm</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <h5>
          Content <b>management system</b> OneEntry!
        </h5>
        <p>
          @ 2022 OneEntry, by <b>oneentry.cloud</b>
        </p>
      </div>
    </footer>
  );
}
