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
  if (isEvidence) {
    let code = "";
    if (evidence?.code) {
      if (evidence.type === "S") {
        code = `<b>[${evidence.code}]</b>`;
      }
      code = `[${evidence.code}]`;
    }

    switch (citationSize) {
      case CITATION_SIZE.LARGE:
        return `${showIndex ? "e" + evidence.index + "." : ""}${
          evidence?.name ? evidence.name : ""
        } ${code}`;
      case CITATION_SIZE.SMALL:
        return `${showIndex ? "e" + evidence.index + "." : ""}${code}`;
      case CITATION_SIZE.ONLY_INDEX:
        return `[e${evidence.index}]`;
      default:
        return `${showIndex ? "e" + evidence.index + "." : ""}${
          evidence?.name ? evidence.name : ""
        } ${code}`;
    }
  }
  let index = "",
    authors = "",
    citation = "",
    year = "";

  const evidences = publication.evidences;

  if (publication?._id) {
    index = showIndex ? publication.index : "";
    authors = publication.authors;
    citation = publication.citation;
    year = publication.year;
  }

  const evidenceCode = () => {
    let codesA = [];
    let codesIndexA = [];
    if (DataVerifier.isValidArray(evidences)) {
      evidences.forEach((evidence) => {
        if (DataVerifier.isValidObject(evidence)) {
          if (evidence?.code) {
            if (evidence.type === "S") {
              codesA.push(`<b>[${evidence.code}]</b>`);
              codesIndexA.push(`<b>e${evidence.index}</b>`);
            } else {
              codesA.push(`[${evidence.code}]`);
              codesIndexA.push(`e${evidence.index}`);
            }
          }
        }
      });
    }
    let codes = "";
    if (codesA.length > 0) {
      codes =
        codesA.length > 1
          ? "Evidences: " + codesA.join(" ")
          : "Evidence: " + codesA.join(" ");
    }
    return { codes, codesIndex: codesIndexA.join(", ") };
  };

  const { codes, codesIndex } = evidenceCode();

  switch (citationSize) {
    case CITATION_SIZE.LARGE:
      return `${index} ${citation ? `${citation},` : ""} ${codes}`;
    case CITATION_SIZE.SMALL:
      return `(${authors[0]}., et al. ${year ? year : ""})<sup>${index}</sup>`;
    case CITATION_SIZE.ONLY_INDEX:
      return `[${index},${codesIndex}]`;
    default:
      return `${index} ${citation ? `${citation},` : ""} ${codes}`;
  }
}
