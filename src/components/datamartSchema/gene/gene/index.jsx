/** 
 # Component (user guide)

# Gene
	
## Description  
Gene is a React component that takes several properties and renders information about a gene.	
The Citations, ExternalCrossReferences, and Fragments components are child components used within the Gene component to display related information about citations, external cross-references, and gene fragments, respectively.

## Category   
	
Visual

## Live demo 
	
--

## Installation or Implementation

--

## Usage 
	
--

## Props 

| Attribute              | Type  | Default  | Description                                            |
| ---------              | ----  | -------  | -----------                                            |
|_id	                   |string |-	        |Unique identifier for the gene.                         |
|allCitations            |array  |	[]	    |Array of all citations related to the gene.             |
|bnumber                 |string |	""	    |The Bnumber associated with the gene.                   |
|centisomePosition       |number |	0	      |The centisome position of the gene.                     |
|citations	             |array	 | []	      |Array of citations related to the gene.                 |
|externalCrossReferences |	array|	[]	    |Array of external cross-references for the gene.        |
|fragments	             |array	 |[]	      |Array of gene fragments.                                |
|gcContent	             | number|	0	      |The GC content of the gene.                             |
|leftEndPosition	       | number|	0	      |The left end position of the gene.                      |
|multifunTerms	         | array |	[]	    |Array of multifunctional terms for the gene.            |
|name	                   | string|	""	    |The name of the gene.                                   |
|note	                   | string|	""	    |Additional notes related to the gene.                   |
|rightEndPosition	       | number|	0	      |The right end position of the gene.                     |
|sequence	               | string|	""	    |The gene sequence.                                      |
|strand	                 | string|	""	    |The strand of the gene (e.g., "forward" or "reverse").  |
|synonyms	               | array | []	      |Array of synonyms for the gene.                         |
|viewTitle	             |boolean|	true	  |Whether to display the gene's title.                    |
|viewExternalRef	       |boolean|	false	  |Whether to display external cross-references.           |
|products	               | array |	[]	    |Array of products associated with the gene.             |


## Exception

---

## License

MIT License

## Author 
	
RegulonDB Team 


# Component (technical guide)

## Component Type 

Visual

## Dependencies
ArrowForwardIcon: it  is an icon provided by the Material-UI (MUI) library, representing a forward arrow.
ArrowBackIcon: it is another Material-UI icon that represents a backward arrow. Similar to ArrowForwardIcon, it is used to indicate a backward direction in the user interface.
ViewSequence: component related to the visualization or manipulation of data sequences.
PanelSequence: component related to presenting panels or sections related to data sequences. 
PropTypes: it is a library used in React for type validation of properties (props) passed to components. 
DataVerifier: the component have a role in data verification or validation before use. 
Accordion: it is a component commonly used to control the expansion and collapse of content in the user interface
ParagraphCitations: it is a component related to the presentation of citations in paragraph format.
NoteCitations: display notes with a particular format.
Citations: This child component renders citations related to the gene.
Fragments:  This child component renders information about gene fragments.
ExternalCrossReferences:  This child component  renders external cross-references related to the gene.



## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |


 * **/
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ViewSequence from "./viewSequence";
import PanelSequence from "./viewSequence/panelSequence";
import PropTypes from "prop-types";
import { DataVerifier, Accordion } from "../../../ui-components";
import { ParagraphCitations, NoteCitations } from "../../citations";


/**
 * Description placeholder
 *
 * @type {{ _id: any; allCitations: any; bnumber: any; centisomePosition: any; citations: any; externalCrossReferences: any; fragments: any; gcContent: any; leftEndPosition: any; multifunTerms: any; name: any; ... 5 more ...; type: any; }}
 */
const PROP_TYPES = {
  _id: PropTypes.string.isRequired,
  allCitations: PropTypes.array.isRequired,
  bnumber: PropTypes.string,
  centisomePosition: PropTypes.number,
  citations: PropTypes.array,
  externalCrossReferences: PropTypes.array,
  fragments: PropTypes.array,
  gcContent: PropTypes.number,
  leftEndPosition: PropTypes.number,
  multifunTerms: PropTypes.array,
  name: PropTypes.string,
  note: PropTypes.string,
  rightEndPosition: PropTypes.number,
  sequence: PropTypes.string,
  strand: PropTypes.string,
  synonyms: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
};


/**
 * Description placeholder
 *
 * @param {{ _id: any; allCitations?: {}; bnumber?: string; centisomePosition?: number; citations: any; externalCrossReferences: any; fragments: any; gcContent?: number; leftEndPosition?: number; multifunTerms: any; ... 8 more ...; products: any; }} {
  _id,
  allCitations = [],
  bnumber = "",
  centisomePosition = 0,
  citations,
  externalCrossReferences,
  fragments,
  gcContent = 0,
  leftEndPosition = 0,
  multifunTerms,
  name = "",
  note = "",
  rightEndPosition = 0,
  sequence = "",
  strand = "",
  synonyms = [],
  viewTitle = true,
  viewExternalRef = false,
  products,
}
 * @returns {React.JSX}
 */
function Gene({
  _id,
  allCitations = [],
  bnumber = "",
  centisomePosition = 0,
  citations,
  externalCrossReferences,
  fragments,
  gcContent = 0,
  leftEndPosition = 0,
  multifunTerms,
  name = "",
  note = "",
  rightEndPosition = 0,
  sequence = "",
  strand = "",
  synonyms = [],
  viewTitle = true,
  viewExternalRef = false,
  products,
}) {

    
  /**
   * Description placeholder
   *
   * @type {number}
   */
  const size = rightEndPosition - leftEndPosition + 1;

  return (
    <div>
      {viewTitle && (
        <p style={{ fontSize: "18px" }}>
          <b>{name} Gene</b>
        </p>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "20% 80%" }}>
        <div className="leftGene">
          <table className="table_auto table_content">
            <tbody>
              {DataVerifier.isValidArray(synonyms) && (
                <tr>
                  <td style={{ fontWeight: "bold" }}>Synonyms: </td>
                  <td>{synonyms.join(", ")}</td>
                </tr>
              )}
              {DataVerifier.isValidString(bnumber) && (
                <tr>
                  <td style={{ fontWeight: "bold" }}>Bnumber:</td>
                  <td>{bnumber}</td>
                </tr>
              )}
              {leftEndPosition && (
                <>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Position:</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p>{leftEndPosition}</p>
                        {strand === "reverse" ? (
                          <ArrowBackIcon fontSize="small" />
                        ) : (
                          <ArrowForwardIcon fontSize="small" />
                        )}
                        <p>{rightEndPosition}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Size:</td>
                    <td>{`${size} bp`}</td>
                  </tr>
                </>
              )}
              {DataVerifier.isValidString(strand) && (
                <tr>
                  <td style={{ fontWeight: "bold" }}>Strand:</td>
                  <td>{strand}</td>
                </tr>
              )}
              {/*DataVerifier.isValidString(sequence) && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Sequence:</td>
                            <td>
                                <ViewSequence
                                    sequence={sequence}
                                    _id={_id} name={name} products={products}
                                />
                            </td>
                        </tr>
                    )*/}
              {DataVerifier.isValidNumber(gcContent) && (
                <tr>
                  <td style={{ paddingLeft: "15px" }}>GC content:</td>
                  <td>{gcContent.toFixed(2)}%</td>
                </tr>
              )}
              {DataVerifier.isValidNumber(centisomePosition) && (
                <tr>
                  <td style={{ fontWeight: "bold" }}>Centisome Position:</td>
                  <td>{centisomePosition}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="rightGen" style={{ marginLeft: "15px" }}>
          {DataVerifier.isValidString(sequence) && (
            <PanelSequence
              sequence={sequence}
              _id={_id}
              name={name}
              products={products}
            />
          )}
        </div>
      </div>
      {DataVerifier.isValidString(note) && (
        <Accordion title={<p style={{ fontWeight: "bold" }}>Note</p>}>
          <p
            dangerouslySetInnerHTML={{
              __html: NoteCitations(allCitations, note),
            }}
          />
        </Accordion>
      )}
      {DataVerifier.isValidArray(fragments) && (
        <Fragments
          _id={_id}
          fragments={fragments}
          strand={strand}
          products={products}
        />
      )}
      {DataVerifier.isValidArray(externalCrossReferences) && viewExternalRef ? (
        <ExternalCrossReferences references={externalCrossReferences} />
      ) : null}
      {DataVerifier.isValidArray(citations) && (
        <Citations citations={citations} allCitations={allCitations} />
      )}
    </div>
  );
}

Gene.propTypes = PROP_TYPES;

export { Gene };


/**
 * This function renders citations related to the gene.
 *
 * @param {{ citations: any; allCitations: any; }} { citations, allCitations }
 * @returns {React.JSX}
 */
function Citations({ citations, allCitations }) {
  return (
    <Accordion title={"Citations"}>
      <div>
        <ParagraphCitations citations={citations} allCitations={allCitations} />
      </div>
    </Accordion>
  );
}

/**
 * Description placeholder
 *
 * @param {{ references: any; }} { references }
 * @returns {React.JSX}
 */
function ExternalCrossReferences({ references }) {
  return (
    <Accordion title={"External Cross References"}>
      <div>
        {references.map(
            
            /**
             * Description placeholder
             *
             * @param {*} reference
             * @returns {*}
             */
            (reference) => {
          return (
            <a
              style={{ marginLeft: "5px" }}
              key={"reference_" + reference.externalCrossReferenceId}
              href={`${reference.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >{`${reference.externalCrossReferenceName}: ${reference.objectId}`}</a>
          );
        })}
      </div>
    </Accordion>
  );
}

function Fragments({ fragments, strand, products, _id }) {
  return (
    <Accordion title={<p style={{ fontWeight: "bold" }}>Fragments</p>}>
      <div>
        <table className="table_auto table_content">
          <thead>
            <tr>
              <th>name</th>
              <th>position</th>
              <th>sequence</th>
            </tr>
          </thead>
          <tbody>
            {fragments.map((fragment, index) => (
              <tr key={`fragmentInfo_${fragment.id}_${index}`}>
                <td>{fragment.name}</td>
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
                <td>
                  <ViewSequence
                    _id={_id}
                    sequence={fragment.sequence}
                    products={products}
                    title={`fragment_${fragment.name}_sequence`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Accordion>
  );
}
