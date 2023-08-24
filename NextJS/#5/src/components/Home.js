import Image from "next/image";
import banner from "../assets/images/banner.png";
import facebook from "../assets/images/facebook.png";
import line from "../assets/images/line.png";
import instagram from "../assets/images/instagram.png";
import picture from "../assets/images/picture.png";
import arrow from "../assets/images/arrow2.png";

function TextWithHeader({text}){
  return <div>
    <h1>{text.header}</h1>
    <div dangerouslySetInnerHTML={{__html: text?.value}}/>
  </div>
}

function Text({text}){
  return  <div dangerouslySetInnerHTML={{__html: text?.value}}/>
}

function Footer({data}){
  return (
    <>
      {data.map((value, key) => (
        <div key={key} dangerouslySetInnerHTML={{ __html: value?.value }} />
      ))}
    </>
  );
}

export default function Home({data}) {
  const attributes = {}
  data.attributeValues.map((attribute) => {
    const value = Object.values(attribute)[0]
    const key = Object.keys(attribute)[0]
    attributes[key] = value.length > 1 ? value : value[0];
  })
  return (
    <div className="App">
      <div className="banner">
        <Image className="banner-Image" src={banner} alt="banner" />
        <div className="main-text">
          <TextWithHeader text={attributes.maintext} />
          {/* <h1>Blog Details</h1>
          <p className="border">
            The search for life beyond Earth is one of the most exciting and
            challenging endeavors in modern science
          </p> */}
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
      <div className="main-info">
        <div className="container">
          <Text text={attributes.maininfo} />
          {/* <h2>The vastness and mystery of space and planets</h2>
          <h3>
            The universe is full of wonders that continue to captivate our
            imagination and push the boundaries of our understanding
          </h3>
          <p>
            The universe is vast and seemingly infinite, with galaxies and
            galaxy clusters spanning unfathomable distances. . The enormity of
            the universe is difficult to comprehend, but it is essential to
            appreciate the scale of the cosmos to understand the mysteries and
            possibilities it holds. The James Webb Telescope, for example, has
            already provided awe-inspiring images of distant galaxies and
            nebulae. The universe is full of wonders that continue to captivate
            our imagination and push the boundaries of our understanding .
          </p> */}
          <div className="column">
            <div className="Image">
              <Image
                src={attributes.image.downloadLink}
                width={300}
                height={300}
                alt="instagram"
              />
            </div>
            <Text text={attributes.list} />
            {/* <ul>
              <li>
                <Image src={arrow} alt="arrow" />
                The immensity of the Universe, and our place in it.{" "}
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                Does the Universe's Immensity Imply a Huge Waste?{" "}
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                Planetary Composition: The Planet Does Not Fall Far From{" "}
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                Can We Find Life? | The Search For Life.{" "}
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                The search for life beyond Earth{" "}
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                Astrobiology - The Hunt for Life Beyond Earth.{" "}
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                Searching for Life beyond Earth - Astronomy{" "}
              </li>
              <li>
                <Image src={arrow} alt="arrow" />
                Life beyond Earth: The Search for Habitable Worlds in
              </li>
            </ul> */}
          </div>
          <p>
            Planets are among the most intriguing objects in the universe, and
            their formation and composition offer insight into the origins of
            our solar system and the potential for life elsewhere. Planets can
            consist of a variety of materials, including rock, metal, and gas,
            and can range in size from small asteroids to massive gas giants
          </p>
          <div className="blue-message">
            <p>
              As Carl Sagan famously remarked, "In the vastness of space and the
              immensity of time, it is my joy to share a planet and an epoch
              with Annie"
            </p>
          </div>
          <p>
            The planets in our solar system, for instance, are divided into two
            groups: the rocky, terrestrial planets (Mercury, Venus, Earth, and
            Mars) and the gas giants (Jupiter, Saturn, Uranus, and Neptune). The
            composition of these planets is determined by their distance from
            the sun and the conditions present during their formation.
            Understanding the formation and composition of planets is essential
            to unlocking the secrets of the universe and discovering the
            potential for life beyond Earth.
          </p>
          <p>
            The search for life beyond Earth is one of the most exciting and
            challenging endeavors in modern science. While Earth remains the
            only planet known to harbor life, scientists have discovered
            thousands of exoplanets, or planets outside our solar system, and
            many of them are considered potentially habitable. The Transiting
            Exoplanet Survey Satellite (TESS), for example, is designed to
            search for exoplanets around nearby stars and identify targets for
            further study. The search for life beyond Earth is ongoing and
            continues to drive scientific exploration and discovery. As we
            continue to explore the universe, we may one day discover that we
            are not alone in the cosmos.
          </p>
        </div>
      </div>
      <div className="blue-banner">
        <h3>Mercury, Venus, Earth, and Mars</h3>
        <p>Subscribe our Newsletter right now</p>
        <button>Subscribe</button>
      </div>
    </div>
  );
}
