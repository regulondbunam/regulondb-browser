/**
 *
 * @param {object} operon_data |
 * @returns array of objects with ids
 * Esta funcion toma un objeto de operon_data y devuelve un objeto con los ids de los operones, genes, tus y rBS
 *
 * {}
 */

export function OperonIds(operon_data) {
  let ids = {};
  try {
    let tus = [];
    let genes = [];
    let promoters = [];
    let regulator = [];
    let regulatoryInteractions = [];
    let terminators = [];
    operon_data.forEach((operon) => {
      if (operon?.transcriptionUnits) {
        operon.transcriptionUnits.forEach((transcriptionUnit) => {
          tus = IfNoExistPush(tus, transcriptionUnit.id);
          if (transcriptionUnit?.genes) {
            transcriptionUnit?.genes.forEach((gene) => {
              genes = IfNoExistPush(genes, gene.id);
              if (gene?.regulatorBindingSites) {
                gene.regulatorBindingSites.forEach((rbs) => {
                  if (rbs?.regulator) {
                    regulator = IfNoExistPush(regulator, rbs.regulator._id);
                  }
                  if (rbs?.regulatoryInteractions) {
                    rbs.regulatoryInteractions.forEach((ri) => {
                      regulatoryInteractions = IfNoExistPush(
                        regulatoryInteractions,
                        ri._id
                      );
                    });
                  }
                });
              }
            });
          }
          if (transcriptionUnit?.promoter) {
            promoters = IfNoExistPush(promoters, transcriptionUnit.promoter.id);
            if (transcriptionUnit.promoter?.regulatorBindingSites) {
                transcriptionUnit.promoter.regulatorBindingSites.forEach((rbs) => {
                    if (rbs?.regulator) {
                        regulator = IfNoExistPush(regulator, rbs.regulator._id);
                    }
                    if (rbs?.regulatoryInteractions) {
                        rbs.regulatoryInteractions.forEach((ri) => {
                            regulatoryInteractions = IfNoExistPush(
                                regulatoryInteractions,
                                ri._id
                            );
                        });
                    }
                });
            }
        }
          if (transcriptionUnit?.regulatorBindingSites) {
            transcriptionUnit.regulatorBindingSites.forEach((rbs) => {
              if (rbs?.regulator) {
                regulator = IfNoExistPush(regulator, rbs.regulator._id);
              }
              if (rbs?.regulatoryInteractions) {
                rbs.regulatoryInteractions.forEach((ri) => {
                  regulatoryInteractions = IfNoExistPush(
                    regulatoryInteractions,
                    ri._id
                  );
                });
              }
            });
          }
          if (transcriptionUnit?.terminators) {
            transcriptionUnit.terminators.forEach((terminator) => {
              terminators = IfNoExistPush(terminators, terminator._id);
            });
          }
        });
      }
    });
    ids = {
      transcriptionUnits: tus,
      genes: genes,
      promoters: promoters,
      regulator: regulator,
      regulatoryInteractions: regulatoryInteractions,
      terminators: terminators,
      all: genes.concat(promoters).concat(regulator).concat(regulatoryInteractions).concat(terminators)
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
