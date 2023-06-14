import NavigationTabs, { idNavTabs } from "./NavigationTabs";
import Regulates from "./regulates";
import Summary from "./summary";
import DiagramRegulatoryNetwork from "./regulatoryNetwork";
import RegulatoryInteractions from "./regulatoryInteractions";
import Regulator from "./regulator";
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

    const {
        _id,
        allCitations,
        regulates,
        regulator,
        regulatoryInteractions,
        summary,
        terms,
    } = regulonData

    useEffect(() => {
        window.onscroll = function () {
          scrollFunction();
        };
        return function cleanup() {
          window.onscroll = function () {};
        };
      }, []);
    //console.log(regulonData);
    const tabs = [
        {
            id: "regulonTab_regulator",
            name: "Regulator",
            component: <div id="regulonTab_regulator">
                <Regulator regulator={regulator} allCitations={allCitations} />
            </div>
        },
        {
            id: "regulonTab_RegulatoryNetwork",
            subtitle: "Regulatory",
            name: "Network",
            component: <div id="regulonTab_RegulatoryNetwork">
                <DiagramRegulatoryNetwork regulonId={_id} />
            </div>,
        },
        {
            id: "regulonTab_Regulates",
            name: "Regulates",
            component: <div>
                {regulates && (
                    <div >
                        <Regulates regulates={regulates} allCitations={allCitations} />
                    </div>
                )}
            </div>,
        },
        {
            id: "regulonTab_RI",
            subtitle: "Regulatory",
            name: "Interactions",
            component: <div>
                {regulatoryInteractions.length > 0 && (
                    <div >
                        <RegulatoryInteractions regulatoryInteractions={regulatoryInteractions} allCitations={allCitations} />
                    </div>
                )}
            </div>,
        },
        {
            id: "regulonTab_Terms",
            name: "Terms",
            component: <div>
                 {terms && (
                    <Terms geneOntology={terms.geneOntology} multifun={terms.multifun} allCitations={allCitations} />
                 )}
            </div>,
        },
        {
            id: "regulonTab_Summary",
            name: "Summary",
            component: <div>
               <Summary summary={summary} />
            </div>,
        },
        {
            id: "regulonTab_Citations",
            name: "Citations",
            component: <div>
                <Citations allCitations={allCitations} />
            </div>,
        },
    ]
/*
    const tabs = [
        
        
       
        
        
    ];
*/

    return (
        <div >
            <NavigationTabs tabs={tabs} tabSelect={"regulonTab_regulator"} />
        </div>
    );
}

export default Details;