import React, { useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import RegulatorBindingSites from "./regulatorBindigSites";
import Paper from "@mui/material/Paper";
import { ListItem } from "@mui/material";

const Genes = ({ firstGene, genes = [], allCitations }) => {
  return (
    <div>
      {firstGene.gene_id && (
        <div>
          <h3>First Gene</h3>
          <div className="tu_firstGene tu_gene_content">
            <div>{firstGene.gene_id}</div>
            <Link to={"/gene/" + firstGene.gene_id}>
              <div className="tu_firstGene_name">{firstGene.gene_name}</div>
            </Link>
            <div>
              <p>Promoter Distance: {firstGene.distanceToPromoter}bp</p>
            </div>
          </div>
        </div>
      )}
      {genes.length > 0 && (
        <div>
          <h3>Genes</h3>
          <div className="tu_gene_content">
            <List
              sx={{ width: "100%", bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {genes.map((gene, index) => {
                return <ListGene key={`operon_geneList_${gene.id}`} gene={gene} allCitations={allCitations} />;
              })}
            </List>
          </div>
        </div>
      )}
    </div>
  );
};

export default Genes;

function ListGene({ gene, allCitations }) {
  const [open, setOpen] = useState();
  const regulatorBindingSites = gene?.regulatorBindingSites ? gene?.regulatorBindingSites : []
  //console.log("op_gene",gene);
  let regulators = ""

  if (regulatorBindingSites.length > 0) {
    regulators = regulatorBindingSites.map((regulator) => {
      return `${regulator.regulator.name}(${regulator.function})`
    }).join(", ")
  }

  return (
    <React.Fragment>
      <ListItem>
        <div>
          <div><p style={{ fontSize: "10px" }} >{gene.id}</p></div>
          <div>
            <Link to={"/gene/" + gene.id}>
              <p style={{ fontSize: "18px" }} className="p_accent" >Gene {gene.name}
                {regulatorBindingSites.length > 0 && (` regulated by ${regulators}`)}
              </p>
            </Link>
          </div>
          {regulatorBindingSites.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <button onClick={() => {
                setOpen(!open);
              }} className="aBase" >{open ? "Hide": "Show"} Regulator Binding Sites associated to this gene</button>
            </div>
          )}

        </div>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper elevation={1} sx={{ padding: "2%" }}>
          <RegulatorBindingSites regulatorBindingSites={regulatorBindingSites} allCitations={allCitations} />
        </Paper>
      </Collapse>
    </React.Fragment>
  );
}

/**
 *
 *
 */
