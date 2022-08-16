import React, { Component } from "react";
import Title from "../components/Title";
import { Button } from "@mui/material";
import Gene from "./Gene"
import Operon from "./Operon"
import Regulon from "./Regulon"

class Results extends Component {

  componentDidMount() {
    let geneButton = document.getElementById("button_gene_results");
    let operonButton = document.getElementById("button_operon_results");
    let regulonButton = document.getElementById("button_regulon_results");

    if(geneButton){
      geneButton.addEventListener("updateLinkButton",
        function (e) {
          if(e.detail.lengthResults){
            geneButton.style.display = "block";
            geneButton.innerHTML = `Genes(${e.detail.lengthResults})`;
          }
        }
      )
    }

    if(operonButton){
      operonButton.addEventListener("updateLinkButton",
        function (e) {
          if(e.detail.lengthResults){
            operonButton.style.display = "block";
            operonButton.innerHTML = `Operon(${e.detail.lengthResults})`;
          }
        }
      )
    }

    if(regulonButton){
      regulonButton.addEventListener("updateLinkButton",
        function (e) {
          if(e.detail.lengthResults){
            regulonButton.style.display = "block";
            regulonButton.innerHTML = `Regulon(${e.detail.lengthResults})`;
          }
        }
      )
    }

  }

  render() {
    const { keyword } = this.props;
    return (
      <div>
        <Title title={`Search results for ${keyword}`} />
        <article>
          <div className="search_results_links">
            <Button
            id="button_gene_results"
              style={{ display: "none", float: "left" }}
              onClick={() => {
                let geneView = document.getElementById("gene_view");
                geneView.scrollIntoView({
                  alignToTop: true,
                  behavior: "smooth",
                });
              }}
              variant="text"
            />
            <Button
            id="button_operon_results"
              style={{ display: "none", float: "left" }}
              onClick={() => {
                let operonView = document.getElementById("operon_view");
                operonView.scrollIntoView({
                  alignToTop: true,
                  behavior: "smooth",
                });
              }}
              variant="text"
            />
            <Button
            id="button_regulon_results"
              style={{ display: "none" }}
              onClick={() => {
                let regulonView = document.getElementById("regulon_view");
                regulonView.scrollIntoView({
                  alignToTop: true,
                  behavior: "smooth",
                });
              }}
              variant="text"
            />
          </div>
          <br />
          <br />
          <h2>Genes</h2>
          <div id="gene_view">
            <Gene keyword={keyword} />
          </div>
          <br />
          <h2>Operon</h2>
          <div id="operon_view">
            <Operon keyword={keyword} />
          </div>
          <br />
          <h2>Regulon</h2>
          <div id="regulon_view">
            <Regulon keyword={keyword} />
          </div>
          <br />
          <br />
        </article>
      </div>
    );
  }
}

Results.propTypes = {};

export default Results;
