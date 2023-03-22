import React from "react";
import ReactTooltip from "react-tooltip";
import SyntaxHighlighter from "react-syntax-highlighter";

//Assets
import CodeCSS from "./css/Code.module.css";
import { xcode } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import conf from "./../conf/view_main.conf.json";

const Code = (Code) => {
  return (
    <div className={CodeCSS.container}>
      <div className={CodeCSS.buttonContainer}>
        <button
          className={CodeCSS.btnCopy}
          onClick={() => navigator.clipboard.writeText(Code[0])}
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
      </div>
      <SyntaxHighlighter
        lineProps={{ style: { paddingBottom: 8 } }}
        wrapLines={true}
        showLineNumbers={true}
        language={Code[1]}
        customStyle={{
          overflow: "auto",
          maxHeight: "500px",
          background: "#dce7ed",
          fontSize: ".9rem",
          borderRadius: "5px",
          color: "#32617d",
        }}
        style={xcode}
      >
        {Code[0]}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
