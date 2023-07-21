import { DataVerifier } from "../../ui-components";

/**
 *
 * @param {object} operon_data |
 * @returns array of objects with ids
 * Esta funcion toma un objeto de operon_data y devuelve un objeto con los ids de los operones, genes, tus y rBS
 *
 * {}
 */

export function getRelatedIdsByOperonData(operon) {
  let ids = {};
  try {
    let tus = [];
    let genes = [];
    let promoters = [];
    let regulator = [];
    let regulatoryInteractions = [];
    let terminators = [];
    let groupByTu = {}
    if (DataVerifier.isValidArray(operon.transcriptionUnits)) {
      operon.transcriptionUnits.forEach((transcriptionUnit) => {
        let groupTu = []
        tus = IfNoExistPush(tus, transcriptionUnit._id);
        if (DataVerifier.isValidArray(transcriptionUnit.genes)) {
          transcriptionUnit?.genes.forEach((gene) => {
            genes = IfNoExistPush(genes, gene._id);
            groupTu = IfNoExistPush(groupTu, gene._id);
            if (DataVerifier.isValidArray(gene.regulatorBindingSites)) {
              gene.regulatorBindingSites.forEach((rbs) => {
                if (rbs?.regulator) {
                  regulator = IfNoExistPush(regulator, rbs.regulator._id);
                  groupTu = IfNoExistPush(groupTu, rbs.regulator._id);
                }
                if (DataVerifier.isValidArray(rbs.regulatoryInteractions)) {
                  rbs.regulatoryInteractions.forEach((ri) => {
                    regulatoryInteractions = IfNoExistPush(regulatoryInteractions, ri._id);
                    groupTu = IfNoExistPush(groupTu, ri._id);
                  });
                }
              });
            }
          });
        }
        if (DataVerifier.isValidObject(transcriptionUnit.promoter)) {
          promoters = IfNoExistPush(promoters, transcriptionUnit.promoter._id);
          groupTu = IfNoExistPush(groupTu, transcriptionUnit.promoter._id);
          if (DataVerifier.isValidArray(transcriptionUnit.promoter.regulatorBindingSites)) {
            transcriptionUnit.promoter.regulatorBindingSites.forEach((rbs) => {
              if (rbs?.regulator) {
                regulator = IfNoExistPush(regulator, rbs.regulator._id);
                groupTu = IfNoExistPush(groupTu, rbs.regulator._id);
              }
              if (DataVerifier.isValidArray(rbs.regulatoryInteractions)) {
                rbs.regulatoryInteractions.forEach((ri) => {
                  regulatoryInteractions = IfNoExistPush(regulatoryInteractions, ri._id);
                  groupTu = IfNoExistPush(groupTu, ri._id);
                });
              }
            });
          }
        }
        if (DataVerifier.isValidArray(transcriptionUnit.regulatorBindingSites)) {
          transcriptionUnit.regulatorBindingSites.forEach((rbs) => {
            if (rbs?.regulator) {
              regulator = IfNoExistPush(regulator, rbs.regulator._id);
              groupTu = IfNoExistPush(groupTu, rbs.regulator._id);
            }
            if (DataVerifier.isValidArray(rbs.regulatoryInteractions)) {
              rbs.regulatoryInteractions.forEach((ri) => {
                regulatoryInteractions = IfNoExistPush(regulatoryInteractions,ri._id);
                groupTu = IfNoExistPush(groupTu, ri._id);
              });
            }
          });
        }
        if (DataVerifier.isValidArray(transcriptionUnit.terminators)) {
          transcriptionUnit.terminators.forEach((terminator) => {
            terminators = IfNoExistPush(terminators, terminator._id);
            groupTu = IfNoExistPush(groupTu, terminator._id);
          });
        }
        groupByTu[transcriptionUnit._id] = groupTu
      });
    }
    ids = {
      transcriptionUnits: tus,
      genes: genes,
      promoters: promoters,
      regulator: regulator,
      regulatoryInteractions: regulatoryInteractions,
      terminators: terminators,
      all: genes.concat(promoters).concat(regulator).concat(regulatoryInteractions).concat(terminators),
      groupByTu:  groupByTu
    };
  } catch (error) {
    console.error("get Ids operon", error);
  }
  return ids;
}

function IfNoExistPush(array = [], element) {
  if (!array.find((e) => e === element)) {
    array.push(element);
    return array;
  }
  return array;
}
