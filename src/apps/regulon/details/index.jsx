import NavigationTabs, { idNavTabs } from "./NavigationTabs";
import Regulates from "./regulates";
import TranscriptionFactor from "./transcriptionFactor";
import DiagramRegulatoryNetwork from "./regulatoryNetwork";
import RegulatoryInteractions from "./regulatoryInteractions";
import Citations from "./Citations";
import Terms from "./terms";
import { IDTitle, /*UpdateTitle*/ } from '../Title';
import { useEffect } from "react";



function scrollFunction() {
    const cover = document.getElementById(IDTitle)
    const navTabs = document.getElementById(idNavTabs)
    if (
      document.body.scrollTop > 124 ||
      document.documentElement.scrollTop > 124
    ) {
        if(cover){
            cover.style.width = "100%"
            cover.style.position = "fixed"
            cover.style.top = "0px"
        }
        if(navTabs){
            navTabs.style.width = "100%"
            navTabs.style.position = "fixed"
            navTabs.style.top = "47px"
        }
    }else{
        if(cover){
            cover.style.position = "initial"
        }
        if(navTabs){
            navTabs.style.position = "initial"
        }
    }
}

function Details({ regulonData }) {

    useEffect(() => {
        window.onscroll = function () {
          scrollFunction();
        };
        return function cleanup() {
          window.onscroll = function () {};
        };
      }, []);
    const data = regulonData.data[0]
    //console.log(data);

    const tabs = [
        {
            id: "regulonTab_TF",
            name: "Transcription Factor",
            component: <div id={"regulonTab_TF"} >
                <TranscriptionFactor transcriptionFactor={data.transcriptionFactor} allCitations={data.allCitations} />
            </div>,
        },
        {
            id: "regulonTab_RegulatoryNetwork",
            subtitle: "Regulatory",
            name: "Network",
            component: <div id="regulonTab_RegulatoryNetwork">
                <DiagramRegulatoryNetwork regulonId={data._id} />
            </div>,
        },
        {
            id: "regulonTab_Regulates",
            name: "Regulates",
            component: <div id="regulonTab_Regulates">
                {data?.regulates && (
                    <div >
                        <Regulates regulates={data.regulates} allCitations={data.allCitations} />
                    </div>
                )}
            </div>,
        },
        {
            id: "regulonTab_RI",
            subtitle: "Regulatory",
            name: "Interactions",
            component: <div id="regulonTab_RI">
                {data.regulatoryInteractions.length > 0 && (
                    <div >
                        <RegulatoryInteractions regulatoryInteractions={data.regulatoryInteractions} allCitations={data.allCitations} />
                    </div>
                )}
            </div>,
        },
        {
            id: "regulonTab_Terms",
            name: "Terms",
            component: <div id="regulonTab_Terms">
                 {data?.terms && (
                    <Terms geneOntology={data.terms.geneOntology} multifun={data.terms.multifun} allCitations={data.allCitations} />
                 )}
            </div>,
        },
        {
            id: "regulonTab_Citations",
            name: "Citations",
            component: <div id="regulonTab_Citations">
                <Citations allCitations={data.allCitations} />
            </div>,
        },
        
    ];


    return (
        <div >
            <NavigationTabs tabs={tabs} tabSelect={"regulonTab_TF"} />
        </div>
    );
}

export default Details;