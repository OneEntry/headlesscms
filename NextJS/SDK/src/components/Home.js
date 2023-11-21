import Image from "next/image";
import Banner from "./Banner";

function Text({text}){
  return  <div dangerouslySetInnerHTML={{__html: text?.value}}/>
}

function Footer({data}){
  return (
    <>
      {data?.map((value, key) => (
        <div key={key} dangerouslySetInnerHTML={{ __html: value?.value }} />
      ))}
    </>
  );
}

export default function Home() {
  const attributes = {}
  return (
    <div className="App">
      <Banner title="Home"/>
      <div className="main-info">
        <div className="container">
          <Text text={attributes?.maininfo} />
          <div className="column">
            <div className="Image">
              <Image
                src={attributes?.image?.downloadLink}
                width={300}
                height={300}
                alt="instagram"
              />
            </div>
            <Text text={attributes?.list} />
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
      <Footer/>
    </div>
  );
}
