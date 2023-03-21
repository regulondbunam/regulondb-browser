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

const ServInfo = (conf) => {
  const { pathname } = useLocation();
  const service = pathname.substr(1);

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

  console.log(service,DescServices);

  const description = DescServices.filter(
    (e) => e.Nombre === service && e.Descripcion
  );

  let url =
    "http://132.248.220.201:4001/graphql?query=" +
    encodeURI(description[0]["Example"]);

  const codeExample = {
    0: <Example {...description[0]["Example"]} />,
    1: <Code {...Node(description[0]["Example"])} />,
    2: <Code {...Python2(description[0]["Example"])} />,
    3: <Code {...Python3(description[0]["Example"])} />,
    4: <Code {...R(description[0]["Example"])} />,
    5: <Code {...Java(description[0]["Example"])} />,
    6: <Code {...Ruby(description[0]["Example"])} />,
    7: <Code {...Curl(description[0]["Example"])} />,
    8: <Code {...Wget(url)} />,
  };

  return (
    <div className={ServInfoCSS.serviceInfo}>
      <div className={ServInfoCSS.tryContainer}>
        <Link to="/" className={ServInfoCSS.tryLink}>
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
