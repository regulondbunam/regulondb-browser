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
import { CITATION_SIZE } from ".";
import { useMemo } from "react";
import { DataVerifier } from "../../ui-components";

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

export const PC_VARIANTS = {
  list: "list",
  paragraph: "paragraph",
};

const verifiedPublication = (citation) => {
  if (DataVerifier.isValidObject(citation.publication)) {
    return DataVerifier.isValidString(citation.publication._id) ? citation.publication._id : undefined
  }
  return undefined;
};
const verifiedEvidence = (citation) => {
  if (DataVerifier.isValidObject(citation.evidence)) {
    return DataVerifier.isValidString(citation.evidence._id) ? citation.evidence._id : undefined;
  }
  return undefined;
};

function formatParagraph(citations = [], indexedCitations) {
  let publications = {};
  if (DataVerifier.isValidArray(citations)) {
    citations.forEach((citation) => {
      const publicationId = verifiedPublication(citation)
      const evidenceId = verifiedEvidence(citation)
      let indexedCitation = indexedCitations.find(
        /**
         * Find citation in indexed citation
         *
         * @param {object} citation
         * @returns {boolean}
         */
        (_indexedCitation) => {
          const indxPublicationId = verifiedPublication(_indexedCitation)
          const indxEvidenceId = verifiedEvidence(_indexedCitation)
          return publicationId === indxPublicationId && evidenceId === indxEvidenceId
        }
      );
      const indxPublicationId = verifiedPublication(indexedCitation) ? indexedCitation.publication._id : "noPub"
      const evidence = verifiedEvidence(indexedCitation) ? indexedCitation.evidence : undefined
      if (!publications.hasOwnProperty(indxPublicationId)) {
        publications[indxPublicationId] = {
          ...indexedCitation.publication,
          evidences: evidence ? [evidence] : []
        }
      }else{
        publications[indxPublicationId] = {
          ...publications[indxPublicationId],
          evidences: evidence ? [...publications[indxPublicationId].evidences, evidence] : publications[indxPublicationId].evidences
        }
      }
    });
  }
  return publications;
}

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
  variant = PC_VARIANTS.paragraph,
  citationSize = CITATION_SIZE.LARGE,
}) {
  const publications = useMemo(() => {
    return formatParagraph(citations, allCitations);
  }, [citations, allCitations]);
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap">
      {Object.keys(publications).map(
        /**
         * Description placeholder
         *
         * @param {object} cit
         * @param {string} indx
         * @returns {React.JSX}
         */
        (publicationId, indx) => {
          const publication = publications[publicationId]
            return (
              <div>
                <ModalCitation
                  key={`publication_${publication.index}_${indx}_${publicationId}`}
                  publication={publication}
                  citationSize={citationSize}
                />
              </div>
            );
        }
      )}
    </Stack>
  );
}

ParagraphCitations.propTypes = PROP_TYPES;

export { ParagraphCitations };
