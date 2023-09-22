import { DataVerifier } from "../../../../components/ui-components";

export default function formatData(content = "") {
  let data = [];
  let columns = [];
  if (DataVerifier.isValidString(content)) {
    const rawContent = content.split("\n");
    if (DataVerifier.isValidArray(rawContent)) {
      rawContent.forEach((line, i) => {
        const cells = line.split("\t");
        if (i === 0) {
            cells.forEach((cell,ci)=>{
                columns.push({
                    id: cell,
                    header: cell,
                    accessorKey: "column_"+ci,
                  },)
            })
        } else {
          const row = {};
          cells.forEach((cell, ci) => {
            if (i === 0) {
              //column_2
              row["id"] = cell;
            } else {
              row["column_" + ci] = cell;
            }
          });
          data.push(row);
        }
      });
    }
  }
  return {columns, data};
}

/*
1)tuId	2)tuName	3)operonName	4)tuGenes	5)pmName	6)tuEvidence	7)addEvidence	8)confidenceLevel 
RDBECOLITUC03781	spy	spy	spy;	spyp	[EXP-IDA-TRANSCRIPT-LEN-DETERMINATION:S][EXP-IDA-BOUNDARIES-DEFINED:W]		S 
RDBECOLITUC03782	ycaC	ycaC	ycaC;		[COMP-AINF-SINGLE-DIRECTON:W]		W 
*/
