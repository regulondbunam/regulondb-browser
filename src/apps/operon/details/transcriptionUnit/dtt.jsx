import { useMemo } from "react"
import DrawingTracesTool from "../../../../components/DrawingTracesTool";

export default function TUDtt({ operon, tu, showControls = false }) {
    const {
        strand,
        regulationPositions
    } = operon
    const relatedIds = useMemo(() => {
        let genes = []
        let regulator = []
        let regulatoryInteractions = []
        let promoters = []
        let terminators = []
        if (tu?.genes) {
            tu?.genes.forEach((gene) => {
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
        if (tu?.promoter) {
            promoters = IfNoExistPush(promoters, tu.promoter.id);
            if (tu.promoter?.regulatorBindingSites) {
                tu.promoter.regulatorBindingSites.forEach((rbs) => {
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
        if (tu?.regulatorBindingSites) {
            tu.regulatorBindingSites.forEach((rbs) => {
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
        if (tu?.terminators) {
            tu.terminators.forEach((terminator) => {
                terminators = IfNoExistPush(terminators, terminator._id);
            });
        }
        return genes.concat(promoters).concat(regulator).concat(regulatoryInteractions).concat(terminators)
    }, [tu])
    return (
        <div id="dtt_operon">
            {
                <DrawingTracesTool controls={showControls} id={tu.id} relatedIds={relatedIds} context="operon" strand={strand} leftEndPosition={regulationPositions.leftEndPosition} rightEndPosition={regulationPositions.rightEndPosition} />
            }
        </div>
    );
}

function IfNoExistPush(array = [], element) {
    if (!array.find((e) => e === element)) {
        array.push(element);
        return array;
    }
    return array;
}