import { useMemo } from "react";
import { AnchorNav, DataVerifier } from "../../components/ui-components"
import { AllCitations } from "../../components/datamartSchema"
import DrawingTracesTool from "../../components/DrawingTracesTool";
import { TranscriptionUnit } from "../../components/datamartSchema";


const cardOptions = {
    showTitle: false
}

export default function Document({ operonData, section }) {

    console.log(operonData);
    let dtt = <DrawingTracesTool
        context="operon"
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
                _sections.push({
                    id: "OperonAnchor_TU" + tu._id,
                    label: tu.name,
                    title: tu.name,
                    component: <div>
                        <TranscriptionUnit {...tu} regulationPositions={operonData.operon.regulationPositions} strand={operonData.operon.strand} />
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
                title={`Gene ${operonData.operon.name}`} header={dtt} />
        </div>
    )
}