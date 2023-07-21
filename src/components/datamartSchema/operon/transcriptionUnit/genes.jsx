import { Link } from "react-router-dom"
import { DataVerifier } from "../../../ui-components"
import RegulatorBindingSites from "./regulatorBindingSites";

export default function Genes({
    allCitations,
    firstGene,
    genes,
}) {

    let relatedGenes = []

    genes.forEach(gene => {
        if (gene._id !== firstGene._id) {
            relatedGenes.push(gene)
        }
    });

    return (
        <div>
            <h3>Related Genes</h3>
            <div style={{ marginLeft: "5px" }}>
                <p><b>First gene:</b>{" "}<Link to={"/gene/" + firstGene._id} ><b>{firstGene.name}</b></Link></p>
                {DataVerifier.isValidNumber(firstGene.distanceToPromoter) && (
                    <p><b>Distance to promoter:</b>{" " + firstGene.distanceToPromoter + " bp"}</p>
                )}
                {DataVerifier.isValidArray(relatedGenes) && (
                    <p><b>Related genes:</b>{" "}
                        {relatedGenes.map(gene => <Link key={"link_gene_tu_" + gene._id} style={{ marginRight: "5px" }} to={"/gene/" + gene._id} ><b>{gene.name}</b></Link>)}
                    </p>
                )}
                {DataVerifier.isValidArray(genes) && (
                    <div>
                        {genes.map(gene => {
                            return (
                                <div>
                                    {DataVerifier.isValidArray(gene.regulatorBindingSites) && (
                                        <>
                                            <p><b>{`Regulator Binding Sites in gene ${gene.name}`}</b></p>
                                            <RegulatorBindingSites regulatorBindingSites={gene.regulatorBindingSites} allCitations={allCitations} />
                                        </>
                                    )}
                                </div>
                            )
                        })}

                    </div>

                )}
            </div>

        </div>
    )
}