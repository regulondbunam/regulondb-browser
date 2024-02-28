import { DataVerifier } from "../../ui-components";
import { CITATION_SIZE } from ".";

/**
 * Citation label in specific format
 * @date 30/5/2023 - 21:00:25
 * @author Gabriel Alarcon Carranza <galarcon@ccg.unam.mx>
 * @export
 * @param {number} index citation index
 * @param {object} publication is a type Publication of datamart
 * @param {object} evidence is a type Evidence of datamart
 * @returns {String}
 */
export function labelCitation({
  publication = {},
  evidence = {},
  citationSize = CITATION_SIZE.LARGE,
  isEvidence = false,
  showIndex = true,
}) {
  //Evidence label citation
  if (isEvidence && DataVerifier.isValidObject(evidence)) {
    let code = "";
    if (evidence?.code) {
      if (evidence.type === "S") {
        code = `<b>[${evidence.code}]</b>`;
      }
      code = `[${evidence.code}]`;
    }

    switch (citationSize) {
      case CITATION_SIZE.LARGE:
        return `${showIndex ? "EV" + evidence.index + "." : ""}${evidence?.name ? evidence.name : ""
          } ${code}`;
      case CITATION_SIZE.SMALL:
        return `${showIndex ? "EV" + evidence.index + "." : ""}${code}`;
      case CITATION_SIZE.ONLY_INDEX:
        return `[e${evidence.index}]`;
      default:
        return `${showIndex ? "EV" + evidence.index + "." : ""}${evidence?.name ? evidence.name : ""
          } ${code}`;
    }
  }
  if (!DataVerifier.isValidObject(publication)) {
    return "_"
  }

  //Publication Citation
  let publicationLabel = ""
  if (DataVerifier.isValidObjectWith_id(publication)) {
    const { index, authors, citation, year } = publication
    if (DataVerifier.isValidString(citation)) {
      switch (citationSize) {
        case CITATION_SIZE.LARGE:
          publicationLabel = `${index} ${citation}`;
          break;
        case CITATION_SIZE.SMALL:
          publicationLabel = `(${authors[0]}., et al. ${year ? year : ""})<sup>${index}</sup>`;
          break
        case CITATION_SIZE.ONLY_INDEX:
          publicationLabel = `[${index}]`;
          break
        default:
          publicationLabel = " "
          break
      }
    }
  }

  //Evidences
  let evidenceLabel = ""
  if (DataVerifier.isValidArray(publication.evidences)) {

    let evidencesCodes = [];
    let evidencesIndex = [];
    publication.evidences.forEach((evidence) => {
      if (DataVerifier.isValidObjectWith_id(evidence)) {
        if (evidence?.code) {
          if (evidence.type === "S") {
            evidencesCodes.push(`<b>${evidence.code}<sup>EV${evidence.index}</sup></b>`);
            evidencesIndex.push(`<b>${evidence.index}</b>`)
          } else {
            evidencesCodes.push(`${evidence.code}<sup>EV${evidence.index}</sup>`);
            evidencesIndex.push(`${evidence.index}`);
          }
        }
      }
    });

    if (DataVerifier.isValidArray(evidencesCodes)) {
      switch (citationSize) {
        case CITATION_SIZE.LARGE:
          evidenceLabel = `${(evidencesCodes.length > 1 ? "Evidences: " : "Evidence: ")}${evidencesCodes.join(", ")}`;
          break;
        case CITATION_SIZE.SMALL:
          evidenceLabel = `${evidencesCodes.join(", ")}`;
          break
        case CITATION_SIZE.ONLY_INDEX:
          evidenceLabel = `[EV ${evidencesIndex.join(", ")}]`;
          break
        default:
          evidenceLabel = " "
          break
      }
    }

  }





  return `${publicationLabel} ${evidenceLabel}`

  //evidence label


  /*
  
    switch (citationSize) {
      case CITATION_SIZE.LARGE:
        return `${index} ${citation ? `${citation},` : ""} ${(evidencesCodes.length > 0) ? (evidencesCodes.length > 1 ? "Evidences:" : "Evidence: ") : ""} ${evidencesCodes.join(",")}`;
      case CITATION_SIZE.SMALL:
        return `(${authors[0]}., et al. ${year ? year : ""})<sup>${index}</sup>${evidencesCodes.join(",")}`;
      case CITATION_SIZE.ONLY_INDEX:
        return `[${index},${evidencesIndex}]`;
      default:
        return "_"
    }
  */

}
