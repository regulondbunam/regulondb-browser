/**
 *
 * @param {object} operon_data |
 * @returns object of array of ids
 * Esta funcion toma un objeto de operon_data y devuelve un objeto con los ids de los operones, genes, tus y rBS
 */

export function RelatedIds(operon_data) {
  let ids = {};
  let aIds = []
  try {
    operon_data.forEach((operon) => {
      ids["operon"] = operon?._id;
      if (operon?.transcriptionUnits) {
        let tus = [];
        operon.transcriptionUnits.forEach((transcriptionUnit) => {
          transcriptionUnit?.id && tus.push(transcriptionUnit.id);
          if (transcriptionUnit?.genes) {
            let genes = [];
            transcriptionUnit?.genes.forEach((gene) => {
              gene?.id && genes.push(gene.id);
            });
            ids["gene"] = genes;
          }
          if (transcriptionUnit?.promoter) {
            ids["gene"] = transcriptionUnit?.promoter.id;
          }
          if (transcriptionUnit?.regulatorBindingSites) {
            let RegulatoryInteractions = [];
            transcriptionUnit?.regulatorBindingSites.forEach((rBS) => {
              if (rBS?.regulatoryInteractions) {
                rBS?.regulatoryInteractions.forEach((regulatoryInteraction) => {
                  regulatoryInteraction?.id &&
                  RegulatoryInteractions.push(regulatoryInteraction._id);
                })
              }
            });
            ids["RegulatoryInteractions"] = RegulatoryInteractions;
          }
          if (transcriptionUnit?.terminators) {
            let terminators = [];
            transcriptionUnit.terminators.forEach((terminator) => {
              terminator?.id && terminators.push(terminator.id);
            })
            ids["terminator"] = terminators;
          }
        });
        ids["transcriptionUnit"] = tus;
      }
    });
    ids["all"] = aIds.concat(ids["operon"], ids["gene"], ids["transcriptionUnit"], ids["terminator"], ids["RegulatoryInteractions"]);
  } catch (error) {
    console.error("get Phrases Atributes", error);
  }

  return ids;
}
