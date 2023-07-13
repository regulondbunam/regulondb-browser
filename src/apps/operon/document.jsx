import { useMemo } from "react";
import { AnchorNav, DataVerifier } from "../../components/ui-components"
import { AllCitations } from "../../components/datamartSchema"

export default function Document({ operonData, section }) {

    console.log(operonData);

    const sectio = [
        {
            id: "whatIsRegulonDB",
            label: "what is RegulonDB?",
            title: "What is RegulonDB?",
            component:
                <div style={{ margin: "0% 1% 1% 2%" }} >
                    Hola
                </div>
        },

    ]

    const sections = useMemo(() => {
        let _sections = []
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
    },[operonData])

    return (
        <div>
            <AnchorNav sections={sections}
                title={`Gene ${operonData.operon.name}`} />
        </div>
    )
}