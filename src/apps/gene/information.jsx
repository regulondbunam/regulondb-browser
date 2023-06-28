import { useMemo } from "react"
import { NavigationTabs } from "../../components/ui-components"
import { Card } from "../../components/ui-components"
import DrawingTracesTool from "../../components/DrawingTracesTool";
import { Gene, Product, Regulation, AllCitations } from "../../components/datamartSchema"

export default function Information({ geneData }) {

    const tabs = useMemo(() => {
        let tabsInfo = []
        if (geneData?.gene) {
            tabsInfo.push({
                id: "GeneTab_dtt",
                noTab: true,
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
                component: <Card id="GeneTab_regulator" title={`Gene ${geneData.gene.name} Description`} >
                    <div style={{ margin: "0% 1% 1% 2%" }} >
                        <Gene {...geneData.gene} allCitations={geneData.allCitations} viewTitle={false} products={geneData.products} />
                        <br />
                    </div>
                </Card>
            })
        }
        let products = geneData.products
        if (products) {
            tabsInfo.push({
                id: "GeneTab_Products",
                subtitle: "Products",
                name: `(${products.length})`,
                component: <Card id="" GeneTab_Products title={`Products`} >
                    <div style={{ margin: "0% 1% 1% 2%" }} >
                        {products.map((product) => {
                            return <Product key={`product_${product._id}`} {...product} allCitations={geneData.allCitations} />
                        })}

                        <br />
                    </div>
                </Card>
            })
        }
        if (geneData?.regulation) {
            tabsInfo.push({
                id: "GeneTab_Regulation",
                name: "Regulation",
                component: <Card id="GeneTab_Regulation" title={`Regulation`} >
                    <div style={{ margin: "0% 1% 1% 2%" }} >
                        <Regulation {...geneData.regulation} />
                        <br />
                    </div>
                </Card>,
            },)
        }
        if (geneData.allCitations) {
            tabsInfo.push({
                id: "GeneTab_Citations",
                name: "Citations",
                component: <div id="GeneTab_Citations">
                    <h2>Citations</h2>
                    <AllCitations allCitations={geneData.allCitations} />
                </div>,
            })
        }
        return tabsInfo
    }, [geneData])

    return <NavigationTabs tabs={tabs} tabSelect={"GeneTab_Description"}
        title={`Gene ${geneData.gene.name}: ${geneData.products.map(prod => prod.name).join(", ")}`} />
}