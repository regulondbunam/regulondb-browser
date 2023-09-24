import { DataVerifier } from "../../ui-components";

/**
 * Citation label in specific format
 * @date 30/5/2023 - 21:00:25
 * @author Gabriel Alarcon Carranza <galarcon@ccg.unam.mx>
 * @export
 * @param {number} index citation index
 * @param {object} publication is a type Publication of datamart
 * @param {object} evidence is a type Evidence of datamart
 * @param {boolean} [small=true] format of label
 * @returns {String}
 */
export function labelCitation({
  publication = {},
  evidence = {},
  evidences = {},
  small = true,
  isEvidence = false,
  showIndex = true,
  index,
}) {
  if (isEvidence) {
    let code = "";
    if (evidence?.code) {
      if (evidence.type === "S") {
        code = `<b>[${evidence.code}]</b>`;
      }
      code = `[${evidence.code}]`;
    }
    return `${showIndex ? "e" + evidence.index + "." : ""}${
      evidence?.name ? evidence.name : ""
    } ${code}`;
  }

  const { authors, citation, year } = publication;

  /**
   * Description placeholder
   *
   * @type {string}
   */
  const numIndex = `${showIndex ? publication.index + "." : ""}`;
  //W->weak S->strong
  /*
  let codes = "";
  if (DataVerifier.isValidArray(publication.evidences)) {
    let evidenceLabel =
      publication.evidences.length < 2 ? "Evidence: " : "Evidences: ";
    publication.evidences.forEach((evidenceId) => {
      const _evidence = evidences[evidenceId];
      if (evidenceId.type === "S") {
        codes += `${evidenceLabel}<b>[${_evidence.code}]</b>`;
      }
      codes += `${evidenceLabel}[${_evidence.code}]`;
    });
  }*/

  if (small) {
    if (DataVerifier.isValidArray(authors)) {
      return `${numIndex} ${authors[0]}., et al. ${year ? year : ""}`;
    }
    return ``;
  }
  return `${numIndex} ${citation ? `${citation},` : ""}`;
  // [i]autor., et al. año [evidence]
}
