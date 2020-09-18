import React, { useState } from 'react';
import Button from '../../components/ui-components/basicInput/Buttons'
import GnDescription from './GeneDescription'
//import GnProducts from './GeneProduct'
//import GnGrowthC from './GeneGrowthConditions'
//import GnAllInfo from './GeneAllInfo'

const sites = ['all','description', 'product', 'growthconditions']

const GeneTabs = (
    {
        prodCount,
        gwcCount,
        section = '',
        site = 'all',
        idGene,
    }
) => {
    const [tab, setTab] = useState(site)
    
    return (
        <>
                <nav className="tabHeader">
                    {
                        sites.map((item) => {
                            let styleTab = "tab"
                            if (tab === item) {
                                styleTab = "tabActive"
                            }
                            let number = ''
                            switch (item) {
                                case "products":
                                    if (prodCount === 0) {
                                        return null
                                    }
                                    number = '('+prodCount+')'
                                    break;
                                case "growthconditions":
                                    if (gwcCount === 0) {
                                        return null
                                    }
                                    number = '('+gwcCount+')'
                                    break;
                                default:
                                    break;
                            }
                            return (
                                <div key={item} className="tabContent">
                                    <Button id={item} className={styleTab} label={`${item.toUpperCase()}${number}`} onClick={()=>{setTab(item)}} />
                                </div>
                            )
                        })
                    }
                </nav>
                <>
                    {
                        TabSelector(tab, idGene)
                    }
                </>

            </>
    );
}
 
export default GeneTabs;



function TabSelector(item, idGene) {
    switch (item) {
        case "description":
            return <GnDescription geneID={idGene} />
        default:
            return <h2>Select a tab option</h2>
    }
}
/*
TabSelector(this.state.ActiveOption, idGene)
function TabSelector(item, idGene) {
    switch (item) {
        case "DESCRIPTION":
            return <GnDescription geneID={idGene} />
        case "PRODUCT":
            return <GnProducts geneID={idGene} />
        case "GROWTH CONDITIONS":
            return <GnGrowthC geneID={idGene} />
        case "ALL":
            return <GnAllInfo idGene={idGene} />
        default:
            return <h3>Select a tab option</h3>
    }
}
*/
