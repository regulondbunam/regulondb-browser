import { useMemo } from "react"
import { NavigationTabs, DataVerifier } from "../../components/ui-components"
import { Card } from "../../components/ui-components"
import DrawingTracesTool from "../../components/DrawingTracesTool";
import { Gene, Product, Regulation, AllCitations } from "../../components/datamartSchema"
import RelatedTool from "./components/relatedTool";

export default function Information({ geneData }) {

    const tabs = useMemo(() => {
        let tabsInfo = []
        tabsInfo.push({
            id:"relatedTool",
            noTab: true,
            position: "aside",
            component: <RelatedTool {...geneData} />
        })
        if (geneData?.gene) {
            tabsInfo.push({
                id: "GeneTab_dtt",
                subtitle: "DTT",
                name: "Genome Position",
                position: "head",
                component: <DrawingTracesTool
                    context="gene"
                    height={200}
                    id={geneData._id}
                    leftEndPosition={geneData.gene.leftEndPosition}
                    rightEndPosition={geneData.gene.rightEndPosition}
                    fragments={geneData.gene.fragments}
                    strand={geneData.gene.strand}
                />
            })
            tabsInfo.push({
                id: "GeneTab_Description",
                name: "Description",
                component: <Card title={`Gene ${geneData.gene.name} Description`} >
                    <div style={{ margin: "0% 1% 1% 2%" }} >
                        <Gene {...geneData.gene} allCitations={geneData.allCitations} viewTitle={false} products={geneData.products} />
                        <br />
                    </div>
                </Card>
            })
        }
        if (geneData?.regulation) {
            tabsInfo.push({
                id: "GeneTab_Regulation",
                name: "Regulation",
                component: <Card title={`Regulation`} >
                    <div style={{ margin: "0% 1% 1% 2%" }} >
                        <Regulation {...geneData.regulation} />
                        <br />
                    </div>
                </Card>,
            },)
        }
        let products = geneData.products
        if (DataVerifier.isValidArray(products)) {
            products.forEach((product,index) => {
                tabsInfo.push({
                    id: "GeneTab_Products"+index,
                    subtitle: "Product",
                    name: product.name,
                    component: <Card title={`Product: ${product.name}`} >
                        <div style={{ margin: "0% 1% 1% 2%" }} >
                        <Product key={`product_${product._id}`} {...product} allCitations={geneData.allCitations} />
                            <br />
                        </div>
                    </Card>
                })
            });
            
        }
        
        if (geneData.allCitations) {
            tabsInfo.push({
                id: "GeneTab_Citations",
                name: "Citations",
                component: <div >
                    <h2>Citations</h2>
                    <AllCitations allCitations={geneData.allCitations} />
                </div>,
            })
        }
        return tabsInfo
    }, [geneData])

    return <NavigationTabs tabs={tabs} tabSelect={"GeneTab_Description"}
        title={`Gene ${geneData.gene.name}`} />
}