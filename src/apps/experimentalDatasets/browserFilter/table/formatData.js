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
              let cellStyle = {}
              if (/sequence/g.test(cell.toLowerCase())) {
                cellStyle = {textAlign: "left", fontFamily: '"Courier New", Courier, monospace', fontSize: "x-large"}
              }
              let indx = ci+1
                columns.push({
                    id: cell,
                    header: cell,
                    filter: "fuzzyText",
                    accessorKey: "column_"+indx,
                    cellStyle: cellStyle
                  },)
            })
        } else {
          const row = {};
          cells.forEach((cell, ci) => {
            let indx = ci+1
            if (i === 0) {
              //column_2
              row["id"] = cell;
            } else {
              row["column_" + indx] = cell;
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
