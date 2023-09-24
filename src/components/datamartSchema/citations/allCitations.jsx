/**
 # Component (user guide)

# AllCitations
	
## Description  
	
AllCitations takes a list of citations, presents them in a table and displays them using the ModalCitation component.

## Category   
	
[Visual]  

## Live demo 
	
[code to iframe CodeSandbox]

## Installation or Implementation

[example: npm install --save react-awesome-button]

## Usage 
	
[example: <AllCitationsDeprecated allCitations = {[]} small = {isSmall}/> ]

## Props 

| Attribute  | Type  | Default | Description                                             |
| ---------  | ----  | ------- | ------------------------------------------------------- |
|allCitations|array  |         | Citations'  list to show in the component AllCitations. |
|   small    |boolean|         | Decide whether the size of the citation is small or not.|

## Exception

__Category: [Error]__
If there is an error while rendering, it is caught in the catch block and the function returns null.


## License

MIT License

## Author 
	
RegulonDB Team


# Component (technical guide)

## Component Type 

[Visual]

## Dependencies
ModalCitation: The list of citations is rendered inside the "ModalCitation" component, evidence, publication, index and small are passed as props to create the modal citation.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |


 **/

import { ModalCitation } from "./modal";
import { DataVerifier } from "../../ui-components";
import { useMemo, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/**
 * Description placeholder
 * @export
 * @param {{ allCitations: any; small?: boolean; }} { allCitations, small = false }
 * @returns {React.JSX}
 */

export function AllCitationsDeprecated({ allCitations, small = false }) {
  if (!allCitations) {
    return null;
  }
  return (
    <>
      <table>
        <tbody>
          {allCitations.map(
            /** 
              @param {Object} cit - Citation object to be rendered
              @param {number} index - Index of the citation in the list.
              @returns {JSX.Element|null} JSX element representing the table row with the rendered citation or null in case of error.
            **/
            (cit, index) => {
              try {
                return (
                  <tr key={`citation_no_000${index}`}>
                    <td>
                      <ModalCitation
                        evidence={cit.evidence}
                        publication={cit.publication}
                        index={index + 1}
                        small={small}
                      />
                    </td>
                  </tr>
                );
              } catch (error) {
                return null;
              }
            }
          )}
        </tbody>
      </table>
      <br />
      <br />
    </>
  );
}

export default function useIndexedCitation(allCitations, OrderProperties) {
  const { publications, evidences, indexedCitations } = useMemo(() => {
    return getUniquePublication(allCitations);
  }, [allCitations]);
  return { publications, evidences, indexedCitations };
}

export function AllCitations({ publications, evidences }) {
  const [view, setView] = useState(3);

  const handleChange = (event) => {
    setView(event.target.value);
  };
  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={view}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={1}>Publications</MenuItem>
            <MenuItem value={2}>Evidences</MenuItem>
            <MenuItem value={3}>Publications & Evidences</MenuItem>
          </Select>
          <FormHelperText>
            Select the view of publications or evidence, related to
          </FormHelperText>
        </FormControl>
      </div>
      <div>
        {view === 1 && (
          <Publications evidences={evidences} publications={publications} />
        )}
        {view === 2 && (
          <Evidences evidences={evidences} publications={publications} />
        )}
        {view === 3 && (
          <>
            <Publications evidences={evidences} publications={publications} />
            <Evidences evidences={evidences} publications={publications} />
          </>
        )}
      </div>
    </div>
  );
}

function getUniquePublication(allCitations = []) {
  let publications = {};
  let publicationIndex = 1;
  let evidences = {};
  let evidenceIndex = 1;
  let indexedCitations = [];
  if (DataVerifier.isValidArray(allCitations)) {
    allCitations.forEach((citation) => {
      let publication = null;
      let evidence = null;
      const hasEvidence = DataVerifier.isValidObject(citation.evidence);
      const hasPublication = DataVerifier.isValidObject(citation.publication);
      if (hasPublication) {
        if (!publications.hasOwnProperty(citation.publication._id)) {
          publications[citation.publication._id] = {
            ...citation.publication,
            index: publicationIndex,
            evidences: hasEvidence ? [citation.evidence._id] : [],
          };
          publicationIndex++;
        } else {
          publications[citation.publication._id] = {
            ...publications[citation.publication._id],
            evidences: hasEvidence
              ? [
                  ...publications[citation.publication._id].evidences,
                  citation.evidence._id,
                ]
              : publications[citation.publication._id].evidences,
          };
        }
        publication = {
          ...citation.publication,
          index: publicationIndex,
          evidences: publications[citation.publication._id].evidences,
        };
      }
      if (hasEvidence) {
        if (!evidences.hasOwnProperty(citation.evidence._id)) {
          evidences[citation.evidence._id] = {
            ...citation.evidence,
            index: evidenceIndex,
            publications: hasPublication ? [citation.publication._id] : [],
          };
          evidenceIndex++;
        } else {
          evidences[citation.evidence._id] = {
            ...evidences[citation.evidence._id],
            publications: hasPublication
              ? [
                  ...evidences[citation.evidence._id].publications,
                  citation.publication._id,
                ]
              : evidences[citation.evidence._id].publications,
          };
        }
        evidence = {
          ...citation.evidence,
          index: evidenceIndex,
          publications: evidences[citation.evidence._id].evidences,
        };
      }
      indexedCitations.push({ publication: publication, evidence: evidence });
    });
  }
  return { publications, evidences, indexedCitations };
}

export function Evidences({ evidences, publications, small = false }) {
  //console.log(evidences);
  return (
    <>
      <h3>Evidences</h3>
      <table>
        <tbody>
          {Object.keys(evidences).map((evidenceId) => {
            const evidence = evidences[evidenceId];
            return (
              <tr key={`citation_no_000${evidence.index}`}>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "end",
                  }}
                >
                  e{evidence.index}.
                </td>
                <td>
                  <ModalCitation
                    evidence={evidence}
                    publications={publications}
                    evidences={evidences}
                    small={small}
                    isEvidence
                    showIndex={false}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </>
  );
}

export function Publications({ evidences, publications, small = false }) {
  return (
    <>
      <h3>Publications</h3>
      <table>
        <tbody>
          {Object.keys(publications).map((publicationId) => {
            const publication = publications[publicationId];
            return (
              <tr key={`citation_no_000${publication.index}`}>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "end",
                  }}
                >
                  {publication.index}.
                </td>
                <td>
                  <ModalCitation
                    publication={publication}
                    evidences={evidences}
                    small={small}
                    showIndex={false}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </>
  );
}
