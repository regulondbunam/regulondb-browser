/**
 # Component (user guide)

# Paragraph
	
## Description  
This component is used to render a series of citations from publications in a paragraph layout, with the ability to display details of each citation in a modal.

## Category   
	
[Visual]  

## Live demo 
	
[code to iframe CodeSandbox]

## Installation or Implementation

[example: npm install --save react-awesome-button]

## Usage 
	
[example: <protvista-tooltip>  </protvista-tooltip> ]
allCitations,
    citations,
    variant = "paragraph",
## Props 

| Attribute  | Type  | Default| Description |
| ---------  | ---- | ------- | -----------                                          |
|allCitations|object|         | An array of quotes expected to be provided. Required.|
|citations   |array |         |Another array of quotes, also required.               |

## Exception

__Category: [Error]__
The exception here could occur within the try block due to possible errors in the search and property access operations.

## License

MIT License

## Author 
	
RegulonDB Team


# Component (technical guide)

## Component Type 

[ Visual ]

## Dependencies
PropTypes:Imports the main React library, which is used to create components and manage state.
ModalCitation:This component is responsible for displaying a modal citation containing information about an evidence and a publication.
Stack: It is used to create and control the arrangement of elements in a vertical or horizontal stack or column.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |


 **/

import PropTypes from "prop-types";
import { ModalCitation } from "./modal";
import Stack from "@mui/material/Stack";

/**
 * Description placeholder
 *
 * @type {{ allCitations: any; citations: any; list: any; }}
 */
const PROP_TYPES = {
  allCitations: PropTypes.array.isRequired,
  citations: PropTypes.array.isRequired,
  list: PropTypes.bool,
};

/**
 * Description placeholder
 *
 * @type {{ list: boolean; }}
 */
export const DEFAULT_ParagraphCitations_PROPS = {
  list: false,
};

/**
 * Description placeholder
 *
 * @param {{ allCitations: any; citations: any; variant?: string; }} {
    allCitations,
    citations,
    variant = "paragraph",
}
 * @returns
 */
function ParagraphCitations({
  allCitations,
  citations,
  variant = "paragraph",
}) {
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap">
      {citations.map(
        /**
         * Description placeholder
         *
         * @param {object} cit
         * @param {string} indx
         * @returns {React.JSX}
         */
        (cit, indx) => {
          try {
            //console.log(cit);
            let index =
              allCitations.findIndex(
                /**
                 * Description placeholder
                 *
                 * @param {object} citation
                 * @returns {boolean}
                 */
                (citation) =>
                  citation?.publication?._id === cit?.publication?._id &&
                  citation?.evidence?._id === cit?.evidence?._id
              ) + 1;
              console.log(index);
            let evidence = cit?.evidence ? cit.evidence : undefined;
            let publication = cit?.publication ? cit.publication : undefined;
            return (
              <div>
                <ModalCitation
                  key={`CitaitopnPH_${cit?.publication?._id}_${cit?.evidence?._id}_${indx}`}
                  index={index}
                  evidence={evidence}
                  publication={publication}
                />
              </div>
            );
          } catch (error) {
            return null;
          }
        }
      )}
    </Stack>
  );
}

ParagraphCitations.defaultProps = DEFAULT_ParagraphCitations_PROPS;

ParagraphCitations.propTypes = PROP_TYPES;

export { ParagraphCitations };
