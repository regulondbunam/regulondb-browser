import React from "react";
import ReactTooltip from "react-tooltip";
import { useQuery, gql } from "@apollo/client";
//Assets
import ExampleCSS from "./css/Example.module.css";
import conf from "./../conf/view_main.conf.json";

const ExampleOutput = (Code) => {
  const query = gql`
    ${Code[0].toString()}
  `;

  const { loading, error, data } = useQuery(query);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error...</p>;

  let codeResult = [];
  codeResult.push(JSON.stringify(data, null, "\t"));
  return (
    <div className={ExampleCSS.container}>
      <button
        className={ExampleCSS.btnCopy}
        onClick={() => navigator.clipboard.writeText(codeResult[0])}
        data-tip
        data-for="copyTip"
      >
        {conf.code.copy_button.title}
      </button>
      <ReactTooltip
        id="copyTip"
        place="left"
        effect="solid"
        backgroundColor="#32617d"
      >
        {conf.code.copy_hover_text.title}
      </ReactTooltip>
      <pre className={ExampleCSS.containerCode}>
        <code className={ExampleCSS.code}>
          {codeResult[0].split("\n").map((e, i) => (
            <span className={ExampleCSS.span} key={i}>
              {e}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default ExampleOutput;
