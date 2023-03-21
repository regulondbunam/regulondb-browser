import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
//Components
import { GetData } from "../../../webServices/docs_queries";
import { FormatDataServDesc } from "../../../webServices/structuringData";
import Table from "./TableArgs";
import Code from "./Code";
import Example from "./ExampleOutput";
import {
  Node,
  Python2,
  Python3,
  R,
  Java,
  Ruby,
  Curl,
  Wget,
} from "./ExampleLanguages";
//Assets
import ServInfoCSS from "./css/ServInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const ServInfo = ({conf, service}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const buttons = conf.buttons;
  const titles = conf.titles;

  const [active, setActive] = useState(0);

  const handleOnClick = (index) => {
    setActive(index);
  };

  const { loading, error, data } = useQuery(GetData());
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error...</p>;

  const DescServices = FormatDataServDesc(data);

  
  const description = DescServices.filter(
    (e) => e.Nombre === service && e.Descripcion
  );

  console.log(service,description[0]["Ejemplo"]);


  let url =
    "http://132.248.220.201:4001/graphql?query=" +
    encodeURI(description[0]["Ejemplo"]);

  const codeExample = {
    0: <Example {...description[0]["Ejemplo"]} />,
    1: <Code {...Node(description[0]["Ejemplo"])} />,
    2: <Code {...Python2(description[0]["Ejemplo"])} />,
    3: <Code {...Python3(description[0]["Ejemplo"])} />,
    4: <Code {...R(description[0]["Ejemplo"])} />,
    5: <Code {...Java(description[0]["Ejemplo"])} />,
    6: <Code {...Ruby(description[0]["Ejemplo"])} />,
    7: <Code {...Curl(description[0]["Ejemplo"])} />,
    8: <Code {...Wget(url)} />,
  };

  return (
    <div className={ServInfoCSS.serviceInfo}>
      <div className={ServInfoCSS.tryContainer}>
        <Link to="/doc_datamarts" className={ServInfoCSS.tryLink}>
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            style={{ fontSize: "1rem" }}
          />
          &nbsp;{buttons.back_button.title}
        </Link>
      </div>
      <h3 className={ServInfoCSS.titles}>{service}</h3>
      <p className={ServInfoCSS.description}>{description[0]["Descripcion"]}</p>
      <hr className={ServInfoCSS.line} />
      <h3 className={ServInfoCSS.titles}>{titles.args.title}</h3>
      <Table service={service} />
      <h3 className={ServInfoCSS.titles}>{titles.query_example.title}</h3>
      <Code {...[description[0]["Ejemplo"], "graphql"]} />
      <div className={ServInfoCSS.tryContainer}>
        <a
          rel="nofollow noopener noreferrer"
          href={url}
          target="_blank"
          className={ServInfoCSS.tryLink}
        >
          {buttons.try_it_now_button.title}
        </a>
      </div>
      <hr className={ServInfoCSS.line} />
      <h3 className={ServInfoCSS.titles}>{titles.languages.title}</h3>

      <div className={ServInfoCSS.buttons}>
        {buttons.language_buttons.map((button, index) => (
          <div key={button.id} className={ServInfoCSS.languageSection}>
            <button
              className={`${ServInfoCSS.languages} ${
                active === index && ServInfoCSS.active
              }`}
              onClick={() => handleOnClick(index)}
            >
              {button.title}
            </button>
          </div>
        ))}
      </div>
      <div>{codeExample[active]}</div>
      <hr className={ServInfoCSS.line} />
    </div>
  );
};

export default ServInfo;
