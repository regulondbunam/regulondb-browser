import React from "react";
import { Cover } from "../../../components/ui-components/ui_components";
import Drop from "./drop_crossref";
export default function Title(geneName, geneID, products, data) {
  const propd = products
    .map((product) => {
      return `${product.name}`;
    })
    .join(" / ");
  //console.log(data);
  let location = undefined;
  //cellularLocations
  if (data?.products) {
    try {
      location = "";
      let p = data?.products;
      p.forEach((product) => {
        if (product?.cellularLocations) {
          product.cellularLocations.map((es) => {
            location += es;
            return null;
          });
          //console.log("loc:", location);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  let synonyms = undefined;
  if (data?.gene?.synonyms) {
    try {
      synonyms = data?.gene?.synonyms.map((synonym) => {
        return `${synonym} `;
      });
    } catch (error) {}
  }
  let length = undefined;
  if (data?.gene?.sequence) {
    try {
      let sg = data?.gene?.sequence;
      length = sg.length;
    } catch (error) {}
  }
  let position = undefined;
  if (data?.gene?.rightEndPosition) {
    try {
      let strand = "->";
      if (data?.gene?.strand === "reverse") {
        strand = "<-";
      }
      position = `${data?.gene?.leftEndPosition} ${strand} ${data?.gene?.rightEndPosition}`;
    } catch (error) {}
  }
  return (
    <Cover>
      <table style={{ tableLayout: "fixed", width: "auto" }}>
        <tbody>
          <tr>
            <td>Gene</td>
            <td>Product</td>
          </tr>
          <tr>
            <td>
              <h1
                assistentvalue={`${geneName} gene page...`}
                style={{ margin: "0" }}
                dangerouslySetInnerHTML={{
                  __html: `${geneName}`
                }}
              ></h1>
            </td>
            <td>
              <h2
                assistentvalue={`${geneName} gene page...`}
                style={{ margin: "0" }}
                dangerouslySetInnerHTML={{
                  __html: `${propd}`
                }}
              ></h2>
            </td>
          </tr>
        </tbody>
      </table>
      <table style={{ tableLayout: "fixed", width: "auto" }}>
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
                  {location ? (
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Location:</td>
                      <td>{location}</td>
                    </tr>
                  ) : (
                    <tr></tr>
                  )}
                </tbody>
              </table>
            </td>
            <td>{Drop(geneID, data?.gene?.externalCrossReferences)}</td>
          </tr>
        </tbody>
      </table>
      <br />
    </Cover>
  );
}
