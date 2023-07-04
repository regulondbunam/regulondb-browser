import React, { useState, useEffect } from "react";
import { Cover } from "../../../components/ui-components";
import DropRef from "./drop_crossref";
import "./title.css";

const IDTitle = "title_cover_geneTool";
const eventName = "cover_geneTool_event";

export function UpdateTitle({ state, message }) {
  let detail = {};
  if (state) {
    detail.state = state;
  }
  if (message) {
    detail.message = message;
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

export const Title = ({ title, geneData }) => {
  const [_state, set_state] = useState();
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
          if (e.detail.message) {
            set_message(e.detail.message);
          }
        },
        false
      );
    }
  }, []);
  if (!geneData) {
    return (
      <div id={IDTitle} >
        <Cover state={_state} message={_message}>
          <h1>{title}</h1>
        </Cover>
      </div>
    );
  }
  const {
    _id,
    name,
    products,
    synonyms,
    length,
    position,
    locations,
    externalCrossReferences,
    fragments,
    strand
  } = formatDataHeader(geneData);
  return (
    <div id={IDTitle}>
      <Cover id={"component_" + IDTitle} state={_state} message={_message}>
        <table className="title_head" style={{ tableLayout: "fixed", width: "auto" }}>
          <tbody>
            <tr>
              <td>Gene</td>
              <td>Products</td>
            </tr>
            <tr>
              <td>
                {name ? (
                  <h1
                    style={{ margin: "0" }}
                    dangerouslySetInnerHTML={{
                      __html: `${name}`,
                    }}
                  ></h1>
                ) : (
                  <h1
                    style={{ margin: "0" }}
                  >
                    Unknown Gene Name
                  </h1>
                )}
              </td>
              <td>
                {products ? (
                  <h1
                    style={{ margin: "0", color: "#666666" }}
                    dangerouslySetInnerHTML={{
                      __html: `${products}`,
                    }}
                  ></h1>
                ) : (
                  <h1
                    style={{ margin: "0", color: "#666666" }}
                    dangerouslySetInnerHTML={{
                      __html: `${products}`,
                    }}
                  ></h1>
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
                    {
                      fragments && (
                        <tr >
                          <td colSpan={"2"} >
                            <FragmentsTable fragments={fragments} strand={strand} />
                          </td>
                        </tr>
                      )
                    }
                    {length ? (
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Length:</td>
                        <td>{length}</td>
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
                  <DropRef id={_id} externalCrossReferences={externalCrossReferences} />
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

function formatDataHeader(geneData) {
  let headerData = {
    _id: geneData._id
  }
  if (geneData.gene) {
    geneData.gene.name && (headerData.name = geneData.gene.name);
    geneData.gene.synonyms && (headerData.synonyms = geneData.gene.synonyms.join(", "));
    if (geneData.gene.leftEndPosition && geneData.gene.rightEndPosition) {
      let row = "->";
      geneData.gene.strand === "reverse" && (row = "<-");
      headerData.position = `${geneData.gene.leftEndPosition} ${row} ${geneData.gene.rightEndPosition}`;
      headerData.length = `${geneData.gene.rightEndPosition - geneData.gene.leftEndPosition} bp`;
    } else {
      geneData.gene.strand && (headerData.strand = geneData.gene.strand)
      geneData.gene.fragments && (headerData.fragments = geneData.gene.fragments)
    }
  }
  if (geneData.products) {
    if (geneData.products.length > 0) {
      headerData.products = geneData.products
        .map((product) => product.name)
        .join(", ");
      headerData.locations = geneData.products
        .map((product) => product.cellularLocations.join(", "))
        .join(", ");
    } else {
      headerData.products = "";
      headerData.locations = "";
    }
  }
  geneData.gene.externalCrossReferences &&
    (headerData.externalCrossReferences = geneData.gene.externalCrossReferences);
  return headerData
}

function FragmentsTable({ fragments = [], strand }) {
  let row = "->";
  strand === "reverse" && (row = "<-");
  return (
    <div>
      <table className="table_content" >
        <thead>
          <tr>
            <th style={{ fontSize: "12px" }} >Fragmented gene in {fragments.length} parts</th>
          </tr>
        </thead>
        <tbody>
          {
            fragments.map((fragment, index) => {
              let position = `${fragment.leftEndPosition} ${row} ${fragment.rightEndPosition}`;
              let length = `${fragment.rightEndPosition - fragment.leftEndPosition}bp`;
              return (
                <tr key={`gene_fragment_title_${fragment.id}_${index}`} >
                  <td style={{ fontSize: "12px" }} >{fragment.name} : {position}({length})</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
