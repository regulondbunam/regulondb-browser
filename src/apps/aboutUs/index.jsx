import { Cover, AnchorNav } from "../../components/ui-components"
import { Funding } from "./funding"
import { WRegulonDB } from "./whatIsRegulonDB"
import { TermsConditions } from "./termsConditions"


export default function AboutUs() {
    
    const sections = [
        {
            id: "whatIsRegulonDB",
            label: "what is RegulonDB?",
            title: "What is RegulonDB?",
            component:
                <div style={{ margin: "0% 1% 1% 2%" }} >
                   <WRegulonDB/>
                </div>
        },
        {
            id: "Funding",
            label: "Funding",
            title: "Funding",
            component:
                <div style={{ margin: "0% 1% 1% 2%" }} >
                   <Funding />
                </div>
        },
        {
            id: "terms_and_conditions",
            label: "Terms & Conditions",
            title: "End User License Agreement for Academic/Noncommercial Use of RegulonDB.",
            component:
                <div style={{ margin: "0% 1% 1% 2%" }} >
                   <TermsConditions />
                </div>
        },
        
    ]

    return (
        <div>
            <Cover>
                <h1 style={{fontSize: "xxx-large"}} >About us</h1>
            </Cover>
            <AnchorNav title="About us" sections={sections} />
        </div>
    )
}