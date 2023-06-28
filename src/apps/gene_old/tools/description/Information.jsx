import React from "react";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Phrase from "./phrases";
import ViewSequence from "./viewSequence";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CitationsNote } from "../../../../components/citations/citations_note";

const idInformationCard = "rdb_gene_information"
const  eventName = "card_gene_update"

export function enableInformationPhrases(viewPhrases){
  
  const detail = {viewPhrases: viewPhrases};

  const CARD = document.getElementById(idInformationCard);
  if (CARD) {
    const CARD_REACTION = new CustomEvent(eventName, {
      bubbles: true,
      detail: detail,
    });
    CARD.dispatchEvent(CARD_REACTION);
  }
}

export default function Information({ gene, allCitations }) {
  const [_show, set_show] = React.useState(true);
  const [_viewPhrases, set_viewPhrases] = React.useState(false);

  React.useEffect(() => {
    const card = document.getElementById(idInformationCard);
    if (card) {
      card.addEventListener(
        eventName,
        function (e) {
          //console.log(`state`, e.detail)
          set_viewPhrases(e.detail.viewPhrases);
        },
        false
      );
    }
  }, []);

  let size = gene?.rightEndPosition - gene?.leftEndPosition;

  return (
    <Paper>
      <div id={idInformationCard} style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <IconButton
              sx={{ width: "10px", height: "10px" }}
              aria-label="view"
              onClick={() => {
                set_show(!_show);
              }}
            >
              {_show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </div>
          <div>
            <h2>Gene Information</h2>
          </div>
        </div>
      </div>
      {_show && (
        <div>
          <div style={{ paddingLeft: "5%" }}>
            <table className="table_auto table_content">
              <tbody>
                {gene?.name && (
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Name:</td>
                    <td>
                      {gene.name}
                      {_viewPhrases && <Phrase />}
                    </td>
                  </tr>
                )}
                {gene?.synonyms && (
                  <tr> 
                    <td style={{ fontWeight: "bold" }}>Synonyms: </td>
                    <td>{gene?.synonyms.join(", ")}</td>
                  </tr>
                )}
                {gene?.bnumber && (
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Bnumber:</td>
                    <td>{gene?.bnumber}</td>
                  </tr>
                )}
                {gene?.leftEndPosition && (
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Position:</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p>{gene?.leftEndPosition}</p>
                        {gene?.strand === "reverse" ? (
                          <ArrowBackIcon fontSize="small" />
                        ) : (
                          <ArrowForwardIcon fontSize="small" />
                        )}
                        <p>{gene?.rightEndPosition}</p>
                      </div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={{ fontWeight: "bold" }}>Size:</td>
                  <td>{size}bp</td>
                </tr>
                {gene?.strand && (
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Strand:</td>
                    <td>{gene?.strand}</td>
                  </tr>
                )}
                {gene?.sequence && (
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Sequence:</td>
                    <td>
                      <ViewSequence
                        sequence={gene.sequence}
                        title={`gene_${gene.name}_sequence`}
                      />
                    </td>
                  </tr>
                )}
                {gene?.gcContent && (
                  <tr>
                    <td style={{ fontWeight: "bold" }}>gc content:</td>
                    <td>{gene?.gcContent}%</td>
                  </tr>
                )}
                {gene?.centisomePosition && (
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Centisome Position:</td>
                    <td>{gene?.centisomePosition}</td>
                  </tr>
                )}
                {gene?.note && (
                  <tr>
                    <td colSpan={2}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <p style={{ fontWeight: "bold" }}>Notes</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: CitationsNote(allCitations, gene.note),
                            }}
                          />
                        </AccordionDetails>
                      </Accordion>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {gene.fragments.length > 0 &&(
            <Fragments fragments={gene.fragments} strand={gene.strand} />
          )}
          {gene?.multifunTerms && (
            <MultifunTerms multifunTerms={gene?.multifunTerms} />
          )}
        </div>
      )}
      <br />
    </Paper>
  );
}

function Fragments({ fragments, strand }) {
  return (
    <div style={{ paddingLeft: "5%" }}>
      <h3>Fragments</h3>
      <div style={{ paddingLeft: "5%" }}>
        {fragments.map((fragment, index) => {
          return (
            <div key={`fragmentInfo_${fragment.id}_${index}`}>
              <h4>
                {fragment.name}{" "}
                <samp style={{ fontSize: "9px" }}>{fragment.id}</samp>
              </h4>
              <table className="table_auto table_content">
                <tbody>
                  {fragment?.leftEndPosition && (
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Position:</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <p>{fragment?.leftEndPosition}</p>
                          {strand === "reverse" ? (
                            <ArrowBackIcon fontSize="small" />
                          ) : (
                            <ArrowForwardIcon fontSize="small" />
                          )}
                          <p>{fragment?.rightEndPosition}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                  {fragment?.sequence && (
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Sequence:</td>
                    <td><ViewSequence sequence={fragment.sequence} title={`fragment_${fragment.name}_sequence`}  /></td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MultifunTerms({ multifunTerms }) {
  return (
    <div style={{ paddingLeft: "5%" }}>
      <h3>Multifun</h3>
      <div style={{ paddingLeft: "5%" }}>
        {multifunTerms.map((m, i) => {
          return (
            <div key={`multifun${i}-data-${m.id}`}>
              <Link to={`/multifun/${m._id}`}>{`${m.label}: ${m.name}`}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
