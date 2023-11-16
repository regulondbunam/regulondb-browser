import { DataVerifier } from "../../../../components/ui-components";

function evidenceCalc(evidence = "") {
  if (/c/.test(evidence.toLowerCase())) {
    return "C";
  }
  if (/s/.test(evidence.toLowerCase())) {
    return "S";
  }
  if (/w/.test(evidence.toLowerCase())) {
    return "W";
  }
  return "";
}

export default function formatData(content = "", evidenceOptions) {
  let data = [];
  let columns = [];
  let evidences = {
    tfrsEvidence: {
      _nColumn: -1,
    },
    riEvidence: {
      _nColumn: -1,
    },
    addEvidence: {
      _nColumn: -1,
    },
    confidenceLevel: {
      _nColumn: -1,
    },
  };
  if (DataVerifier.isValidString(content)) {
    const rawContent = content.split("\n");
    if (DataVerifier.isValidArray(rawContent)) {
      rawContent.forEach((line, i) => {
        const cells = line.split("\t");
        if (i === 0) {
          cells.forEach((cell, ci) => {
            let indx = ci + 1;
            columns.push({
              id: cell,
              header: cell,
              filter: "fuzzyText",
              accessorKey: "column_" + indx,
            });
            let regex = new RegExp("tfrsEvidence");
            if (regex.test(cell)) {
              evidences.tfrsEvidence._nColumn = ci;
              return null;
            }
            regex = new RegExp("riEvidence");
            if (regex.test(cell)) {
              evidences.riEvidence._nColumn = ci;
              return null;
            }
            regex = new RegExp("addEvidence");
            if (regex.test(cell)) {
              evidences.addEvidence._nColumn = ci;
              return null;
            }
            regex = new RegExp("confidenceLevel");
            if (regex.test(cell)) {
              evidences.confidenceLevel._nColumn = ci;
              return null;
            }
          });
        } else {
          let new_tfrsEvidence = [];
          let new_riEvidence = [];
          let new_addEvidence = [];
          let new_confidenceLevel = "";
          if (evidences.tfrsEvidence._nColumn >= 0) {
            const col_tfrsEvidence = cells[evidences.tfrsEvidence._nColumn];
            const codes_tfrsEvidence = col_tfrsEvidence.split(";");
            if (codes_tfrsEvidence) {
              codes_tfrsEvidence.forEach(function (coincidencia) {
                const { selected } = evidenceOptions;
                const evidence = coincidencia.split(":"); // Elimina los corchetes
                if (selected[evidence[0]]) {
                  new_tfrsEvidence.push(coincidencia);
                  new_confidenceLevel += evidence[1];
                }
              });
            }
          }
          new_tfrsEvidence = new_tfrsEvidence.join(";");
          if (evidences.riEvidence._nColumn >= 0) {
            const col_riEvidence = cells[evidences.riEvidence._nColumn];
            const codes_riEvidence = col_riEvidence.split(";");
            if (codes_riEvidence) {
              codes_riEvidence.forEach(function (coincidencia) {
                const { selected } = evidenceOptions;
                const evidence = coincidencia.split(":"); // Elimina los corchetes
                if (selected[evidence[0]]) {
                  new_riEvidence.push(coincidencia);
                  new_confidenceLevel += evidence[1];
                }
              });
            }
          }
          new_riEvidence = new_riEvidence.join(";");
          if (evidences.addEvidence._nColumn >= 0) {
            const col_addEvidence = cells[evidences.addEvidence._nColumn];
            const additiveEvidences = col_addEvidence.split(";");
            const {remove} = evidenceOptions;
            if (DataVerifier.isValidArray(additiveEvidences)) {
              additiveEvidences.forEach((additiveEvidence) => {
                let flag = true
                const codes_addEvidence = additiveEvidence.match(/\(([^)]+)\)/);
                if (codes_addEvidence) {
                  const evidences = codes_addEvidence[1].split("/")
                  if (DataVerifier.isValidArray(evidences)) {
                    for (let index = 0; index < evidences.length; index++) {
                      const evidence = evidences[index];
                      if (
                        remove.hasOwnProperty(evidence)
                      ) {
                        flag = false
                        index = evidences.length+1;
                      }
                    }
                    if(flag){
                      new_addEvidence.push(additiveEvidence);
                      const additiveEvidenceData = additiveEvidence.split(":")
                      new_confidenceLevel += additiveEvidenceData[1];
                    }
                  }
                }

              });
            }
          }
          new_addEvidence = new_addEvidence.join(";");
          const row = {};
          cells.forEach((cell, ci) => {
            let indx = ci + 1;
            if (i === 0) {
              //column_2
              row["id"] = cell;
            } else {
              switch (ci) {
                case evidences.tfrsEvidence._nColumn:
                  row["column_" + indx] = new_tfrsEvidence;
                  break;
                case evidences.riEvidence._nColumn:
                  row["column_" + indx] = new_riEvidence;
                  break;
                case evidences.addEvidence._nColumn:
                  row["column_" + indx] = new_addEvidence;
                  break;
                case evidences.confidenceLevel._nColumn:
                  row["column_" + indx] = evidenceCalc(new_confidenceLevel);
                  break;
                default:
                  row["column_" + indx] = cell;
                  break;
              }
            }
          });
          data.push(row);
        }
      });
    }
  }
  return { columns, data };
}

/*
1)tuId	2)tuName	3)operonName	4)tuGenes	5)pmName	6)tuEvidence	7)addEvidence	8)confidenceLevel 
RDBECOLITUC03781	spy	spy	spy;	spyp	[EXP-IDA-TRANSCRIPT-LEN-DETERMINATION:S][EXP-IDA-BOUNDARIES-DEFINED:W]		S 
RDBECOLITUC03782	ycaC	ycaC	ycaC;		[COMP-AINF-SINGLE-DIRECTON:W]		W 
*/

/*
 */
