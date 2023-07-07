import { useMemo } from "react"
import { AnchorNav, DataVerifier } from "../../components/ui-components"
import DrawingTracesTool from "../../components/DrawingTracesTool";
import { Gene, Product, Regulation, AllCitations, MultifunTerms } from "../../components/datamartSchema"
import RelatedTool from "./components/relatedTool";



export default function Information({ geneData }) {

    let relationTool = null
    let dtt = null

    if (geneData?.gene) {
        relationTool = <RelatedTool {...geneData} />
        dtt = <DrawingTracesTool
            context="gene"
            height={200}
            id={geneData._id}
            leftEndPosition={geneData.gene.leftEndPosition}
            rightEndPosition={geneData.gene.rightEndPosition}
            fragments={geneData.gene.fragments}
            strand={geneData.gene.strand}
        />
    }
    const sections = useMemo(() => {


        let tabsInfo = []
        if (geneData?.gene) {
            tabsInfo.push({
                id: "GeneTab_Description",
                label: "Description",
                title: "Description",
                component:
                    <div style={{ margin: "0% 1% 1% 2%" }} >
                        <Gene {...geneData.gene} allCitations={geneData.allCitations} viewTitle={false} products={geneData.products} />
                    </div>
            })
            if(DataVerifier.isValidArray(geneData.gene.multifunTerms)){
                tabsInfo.push({
                    id: "GeneTab_MultifunTerms",
                    label: "MultifunTerms",
                    title: "MultifunTerms",
                    component:
                        <div style={{ margin: "0% 1% 1% 2%", minHeight: "150px", paddingTop: "20px" }} >
                            <MultifunTerms multifunTerms={geneData.gene.multifunTerms} />
                        </div>
                })
            }
        }
        if (geneData?.regulation) {
            tabsInfo.push({
                id: "GeneTab_Regulation",
                label: "Regulation",
                title: "Regulation",
                component: 
                    <div style={{ margin: "0% 1% 1% 2%" }} >
                        <Regulation {...geneData.regulation} />
                    </div>
            },)
        }
        let products = geneData.products
        if (DataVerifier.isValidArray(products)) {
            products.forEach(product => {
                tabsInfo.push({
                    id: "GeneTab_Products",
                    label: `Product: ${product.name.substring(0, 10)}...`,
                    tooltip: `Product: ${product.name}`,
                    title: `Product ${product.name}`,
                    component:
                        <div style={{ margin: "0% 1% 1% 2%" }} >
                            <Product key={`product_${product._id}`} {...product} allCitations={geneData.allCitations} />
                        </div>
                })
            });
        }

        if (geneData.allCitations) {
            tabsInfo.push({
                id: "GeneTab_Citations",
                label: "Citations",
                title: "Citations",
                component: <div style={{overflow: "auto"}} >
                    <h2>Citations</h2>
                    <AllCitations allCitations={geneData.allCitations} />
                </div>,
            })
        }
        return tabsInfo
    }, [geneData])

    return <AnchorNav sections={sections} header={dtt} aside={relationTool}
        title={`Gene ${geneData.gene.name}`} />
}