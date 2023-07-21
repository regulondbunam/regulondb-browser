import { useMemo } from "react";
import { AnchorNav, DataVerifier } from "../../components/ui-components"
import { AllCitations } from "../../components/datamartSchema"
import DrawingTracesTool from "../../components/DrawingTracesTool";
import { TranscriptionUnit } from "../../components/datamartSchema";
import { getRelatedIdsByOperonData } from "../../components/webservices";


const cardOptions = {
    showTitle: true
}

export default function Document({ operonData, section }) {

    let relatedIds = getRelatedIdsByOperonData(operonData)
    console.log(relatedIds);
    //
    console.log(operonData);
    let dtt = <DrawingTracesTool
        context="operon"
        relatedIds={relatedIds.all}
        height={200}
        id={operonData._id}
        leftEndPosition={operonData.operon.regulationPositions.leftEndPosition - 1000}
        rightEndPosition={operonData.operon.regulationPositions.rightEndPosition + 1000}
        strand={operonData.operon.strand}
        labelTitle={`Operon ${operonData.operon.name} general context`}
    />

    const sections = useMemo(() => {
        let _sections = []
        if (DataVerifier.isValidArray(operonData.transcriptionUnits)) {

            operonData.transcriptionUnits.forEach(tu => {
                let promoterName = ""
                if (DataVerifier.isValidObject(tu.promoter)) {
                    promoterName = " - "+tu.promoter.name
                }
                let tuRelatedIds = relatedIds.groupByTu[tu._id]
                _sections.push({
                    id: "OperonAnchor_TU" + tu._id,
                    label: tu.name+promoterName,
                    title: tu.name+promoterName,
                    component: <div>
                        <TranscriptionUnit {...tu} relatedIds={tuRelatedIds} allCitations={operonData.allCitations} regulationPositions={operonData.operon.regulationPositions} strand={operonData.operon.strand} />
                    </div>
                })
            });
        }
        if (DataVerifier.isValidArray(operonData.allCitations)) {
            _sections.push({
                id: "GeneTab_Citations",
                label: "Citations",
                title: "Citations",
                component: <div style={{ overflow: "auto" }} >
                    <AllCitations allCitations={operonData.allCitations} />
                </div>,
            })
        }
        return _sections
    }, [operonData])

    return (
        <div>
            <AnchorNav sections={sections} cardOptions={cardOptions}
                title={`Operon ${operonData.operon.name}`} header={dtt} />
        </div>
    )
}