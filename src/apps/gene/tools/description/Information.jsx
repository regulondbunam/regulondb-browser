import React from "react";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Phrase from "./phrases";
import ViewSequence from "./viewSequence";

const label = { inputProps: { "aria-label": "enable phrases" } };

export default function Information({ gene }) {
  const [_show, set_show] = React.useState(true);
  const [_viewPhrases, set_viewPhrases] = React.useState(false);

  const handleChange = (event) => {
    set_viewPhrases(event.target.checked);
  };

  let size = gene?.rightEndPosition - gene?.leftEndPosition;

  return (
    <Paper>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        <div>
          {_show && (
            <>
              Enable phrases
              <Switch
                checked={_viewPhrases}
                onChange={handleChange}
                {...label}
              />
            </>
          )}
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
                    <td><ViewSequence sequence={gene.sequence} title={`gene_${gene.name}_sequence`}  /></td>
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
              </tbody>
            </table>
          </div>
          {gene?.multifunTerms && (
            <MultifunTerms multifunTerms={gene?.multifunTerms} />
          )}
        </div>
      )}
      <br />
    </Paper>
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
              <Link to={`/multifun/${m.id}`}>{`${m.label}: ${m.name}`}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
