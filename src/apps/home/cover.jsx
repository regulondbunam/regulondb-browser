import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import Search from "./search";
import ecoliImgT3 from "./media/EcoliRegulonDBT3.webp";



import Style from "./style.module.css";

const searchLinks = [
  {
    label: "Genes",
    link: "/gene",
  },
  {
    label: "Operon",
    link: "/operon",
  },
  {
    label: "Regulon",
    link: "/regulon",
  },
  {
    label: "Sigmulon",
    link: "/sigmulon",
  },
];

export function Cover(params) {
  const [springs, api] = useSpring(() => ({
    from: { height: "300px", opacity: 1 },
  }));
  const [animateSearch, serchA] = useSpring(() => ({
    from: { x:0 },
  }));

  const handleAnimateSearch = () => {
    let elements = document.getElementsByClassName("noAnimate");
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML = "";
      }
    }
    serchA.start({
      from: {
        y: 0,
      },
      to: {
       y: -300,
      },
    })
    api.start({
      from: {
        height: "300px",
        opacity: 1
      },
      to: {
        height: "75px",
        opacity: 0.3
      },
    });
  };
  return (
    <animated.div
      style={{
        ...springs,
      }}
      className={Style.cover}
    >
      <div id={"homeCoverTitle"} className="noAnimate">
        <img
          className={Style.coverEcoliImg}
          src={ecoliImgT3}
          alt="Ecoli RegulonDB"
        />
        <div className={Style.coverTop}>
          <div className={Style.coverTitle}>
            <h1 className={Style.coverH1}>The RegulonDB Database</h1>
            <h2 className={Style.coverH2}>
              <i>Escherichia coli</i> K-12 Transcriptional Regulatory Network
            </h2>
          </div>
        </div>
      </div>
      <br />
      <animated.div style={{...animateSearch}} className={Style.coverSearch }>
        <Search onClick={handleAnimateSearch} />
      </animated.div>
      <div id={"homeCoverBottom"} className="noAnimate">
        {searchLinks.map((link) => {
          return (
            <div
              key={"cover_link" + link}
              style={{ paddingLeft: "10px", float: "left" }}
            >
              <Link style={{color: "#ffffff"}} to={link.link}>{link.label}</Link>
            </div>
          );
        })}
      </div>
    </animated.div>
  );
}

/*
<div className={Style.coverCometText} >
                        Currently the best electronically-encoded regulatory network of any free-living organism.
                        </div>
*/
