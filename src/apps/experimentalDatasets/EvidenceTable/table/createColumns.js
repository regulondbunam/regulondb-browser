import { DataVerifier } from "../../../../components/ui-components";

export default function createColumns(columnsDetails = "") {
  let columnsData = [];
  if (DataVerifier.isValidString(columnsDetails)) {
    const columns = columnsDetails.split("\n");
    columns.forEach((line) => {
      if (/Columns/.test(line)) {
        return null;
      }
      const regex = /\((\d+)\)\s*([\w.]+)\s+(.+)/;
      const match = line.match(regex);

      if (match) {
        columnsData.push({
          accessorKey: "column_"+match[1],
          header: match[2],
          description: match[3],
        });
      } else {
        console.warn(
          "No se encontró un patrón válido en la información de la columna"
        );
      }
    });
  }
  return columnsData;
}

/*Columns:
(1) tuId. Transcription Unit identifier assigned by RegulonDB
(2) tuName. Transcription unit name 
(3) operonName. Operon name containing the transcription unit
(4) tuGenes. Name of the gene(s) contained in the transcription unit
(5) pmName. Promoter Name
(6) tuEvidence. Evidence that supports the existence of the transcription unit
(7) addEvidence. Additive Evidence [CV(EvidenceCode1/EvidenceCodeN)|Confidence Level]
(8) confidenceLevel. TU confidence level (Values: Confirmed, Strong, Weak)
*/
