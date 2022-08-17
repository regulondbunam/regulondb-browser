import React, { useState, useEffect } from "react";
import { Cover } from "../../../components/ui-components";
import DropRef from "./drop_crossref";
import "./title.css";

const IDTitle = "title_cover_geneTool";
const eventName = "cover_geneTool_event";

export function UpdateTitle({ state, title, message, geneToken }) {
  let detail = {};
  if (state) {
    detail.state = state;
  }
  if (title) {
    detail.title = title;
  }
  if (message) {
    detail.message = message;
  }
  if (geneToken) {
    detail.geneToken = geneToken;
  }

  const COVER = document.getElementById(IDTitle);
  if (COVER) {
    const COVER_REACTION = new CustomEvent(eventName, {
      bubbles: true,
      detail: detail,
    });
    COVER.dispatchEvent(COVER_REACTION);
  }
}

export const Title = ({ title }) => {
  const [_state, set_state] = useState();
  const [geneToken, set_geneToken] = useState();
  const [_title, set_title] = useState(title);
  const [_message, set_message] = useState();

  useEffect(() => {
    const cover = document.getElementById(IDTitle);
    if (cover) {
      cover.addEventListener(
        eventName,
        function (e) {
          //console.log(`state`, e.detail)
          if (e.detail.state) {
            set_state(e.detail.state);
          }
          if (e.detail.title) {
            set_title(e.detail.title);
          }
          if (e.detail.message) {
            set_message(e.detail.message);
          }
          if (e.detail.geneToken) {
            set_geneToken(e.detail.geneToken);
          }
        },
        false
      );
    }
  }, []);
  if (!geneToken) {
    return (
      <div id={IDTitle} >
        <Cover state={_state} message={_message}>
          <h1>{_title}</h1>
        </Cover>
      </div>
    );
  }
  const {
    id,
    name,
    products,
    synonyms,
    length,
    position,
    locations,
    externalCrossReferences,
  } = geneToken;
  return (
    <div id={IDTitle}>
      <Cover id={"component_" + IDTitle} state={_state} message={_message}>
        <table className="title_head" style={{ tableLayout: "fixed", width: "auto" }}>
          <tbody>
            <tr>
              <td>Gene</td>
              <td>Product</td>
            </tr>
            <tr>
              <td>
                {name ? (
                  <h1
                    assistentvalue={`${name} gene page...`}
                    style={{ margin: "0" }}
                    dangerouslySetInnerHTML={{
                      __html: `${name}`,
                    }}
                  ></h1>
                ) : (
                  <h1
                    assistentvalue={`null gene page...`}
                    style={{ margin: "0" }}
                  >
                    Unknown Gene Name
                  </h1>
                )}
              </td>
              <td>
                {products ? (
                  <h2
                    assistentvalue={`${name} gene page...`}
                    style={{ margin: "0" }}
                    dangerouslySetInnerHTML={{
                      __html: `${products}`,
                    }}
                  ></h2>
                ) : (
                  <h2
                    assistentvalue={`${name} gene page...`}
                    style={{ margin: "0" }}
                    dangerouslySetInnerHTML={{
                      __html: `${products}`,
                    }}
                  ></h2>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="title_data" id="title_cover_data" style={{ tableLayout: "fixed", width: "auto" }}>
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>
                    {synonyms ? (
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Synonyms:</td>
                        <td>{synonyms}</td>
                      </tr>
                    ) : (
                      <tr></tr>
                    )}
                    {length ? (
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Length:</td>
                        <td>{length}bp</td>
                      </tr>
                    ) : (
                      <tr></tr>
                    )}
                    {position ? (
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Position:</td>
                        <td>{position}</td>
                      </tr>
                    ) : (
                      <tr></tr>
                    )}
                    {locations ? (
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Location:</td>
                        <td>{locations}</td>
                      </tr>
                    ) : (
                      <tr></tr>
                    )}
                  </tbody>
                </table>
              </td>
              <td>
                {externalCrossReferences ? (
                  <DropRef id={id} externalCrossReferences={externalCrossReferences} />
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
      </Cover>
    </div>
  );
};

export default Title;
