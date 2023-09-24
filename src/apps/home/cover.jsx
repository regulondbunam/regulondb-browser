import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import Search from "./search";
import unamLogo from "./media/unamLogo.png";
import ecoliImg from "./media/EcoliRegulonDB.webp";
import ecoliImgT from "./media/EcoliRegulonDBT.webp";
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
    from: { height: "300px" },
  }));

  const handleAnimateSearch = () => {
    let elements = document.getElementsByClassName("noAnimate");
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML = "";
      }
    }
    api.start({
      from: {
        height: "300px",
      },
      to: {
        height: "0px",
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
      <div className={Style.coverSearch + " noAnimate"}>
        <Search onClick={handleAnimateSearch} />
      </div>
      <div id={"homeCoverBottom"} className="noAnimate">
        {searchLinks.map((link) => {
          return (
            <div
              key={"cover_link" + link}
              style={{ paddingLeft: "10px", float: "left" }}
            >
              <Link to={link.link}>{link.label}</Link>
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
