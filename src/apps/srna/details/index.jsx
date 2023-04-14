import NavigationTabs, { idNavTabs } from "./NavigationTabs";
import { Title, IDTitle, UpdateTitle } from '../components/title';
import { useEffect, useState } from "react";
import WebServices from "../../../components/webservices/WebServices";
import { SrnaProduct } from "./product";
import RegulatoryInteractions from "./regulatoryInteractions";
import { Summary } from "./summary";


function scrollFunction() {
    const cover = document.getElementById(IDTitle)
    const navTabs = document.getElementById(idNavTabs)
    if (
        document.body.scrollTop > 124 ||
        document.documentElement.scrollTop > 124
    ) {
        if (cover) {
            cover.style.width = "100%"
            cover.style.position = "fixed"
            cover.style.top = "0px"
        }
        if (navTabs) {
            navTabs.style.width = "100%"
            navTabs.style.position = "fixed"
            navTabs.style.top = "47px"
        }
    } else {
        if (cover) {
            cover.style.position = "initial"
        }
        if (navTabs) {
            navTabs.style.position = "initial"
        }
    }
}

function Details({ srnaId }) {


    const [srnaData, setSrnaData] = useState();

    useEffect(() => {
        window.onscroll = function () {
            scrollFunction();
        };
        return function cleanup() {
            window.onscroll = function () { };
        };
    }, []);

    let tabs = []
    //let dttData = {}

    if (srnaData) {
        console.log(srnaData.data[0]);
        const title = srnaData.data[0].product ? srnaData.data[0].product.name : "srna"
        UpdateTitle({ state: "done", title: title })
        if (srnaData.data[0]._id) {
            tabs.push({
                id: "srnaSummary",
                name: "Summary",
                component: <div>
                    <Summary summary={srnaData.data[0].summary} />
                </div>,
            })
        }
        if (srnaData.data[0].product) {
            tabs.push({
                id: "srnaProduct",
                name: "Product",
                component: <div>
                    <SrnaProduct srnaProduct={srnaData.data[0].product} allCitations={srnaData.data[0].allCitations} />
                </div>,
            })
        }

        if (srnaData.data[0].product) {
            tabs.push({
                id: "srnaRegulatoryInteractions",
                name: "Regulatory",
                subtitle: "Interactions",
                component: <div>
                    <RegulatoryInteractions regulatoryInteractions={srnaData.data[0].regulatoryInteractions} allCitations={srnaData.data[0].allCitations} />
                </div>,
            })
        }
        
        /*
        tabs = [
            {
                id: "srnaRI",
                subtitle: "Regulatory",
                name: "Interactions",
                component: <div id="srnaTab_srnaRI">
                    Regulatory Interactions
                </div>,
            },
            {
                id: "srnaCitations",
                name: "Terms",
                component: <div id="srnaTab_srnaCitations">
                    Citations
                </div>,
            },

        ];*/
    }

    return (
        <div>
            <Title title={"Loading srna data ..."} />
            {!srnaData
                ? (
                    <WebServices datamart_name={"getSrnaBy"}
                        variables={{
                            advancedSearch: `${srnaId}[_id]`,
                            limit: 1
                        }}
                        getData={(data) => { setSrnaData(data) }}
                        getState={(state) => {
                            const titleState = {
                                loading: `Searching regulons ID ${srnaId}... wait a moment`,
                                done: "",
                                error: "sorry we have a problem ... try again later"
                            }
                            UpdateTitle({ state: state, title: titleState[state] })
                        }}
                    />
                )
                : (
                    <div>
                        <NavigationTabs tabs={tabs} tabSelect={"srnaDescription"} />
                    </div>
                )
            }

        </div>
    )
}

export default Details;