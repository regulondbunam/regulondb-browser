import { Link } from "react-router-dom"
import { DataVerifier } from "../../../ui-components"

export default function Genes({
    firstGene,
    genes
}) {

    return (
        <div>
            <h3>Related Genes</h3>
            <div style={{ marginLeft: "5px" }}>
                <p><b>First gene:</b>{" "}<Link to={"/gene/" + firstGene._id} ><b>{firstGene.name}</b></Link></p>
                {DataVerifier.isValidNumber(firstGene.distanceToPromoter) && (
                    <p><b>Distance to promoter:</b>{" " + firstGene.distanceToPromoter + " bp"}</p>
                )}
                {DataVerifier.isValidArray(genes) && (
                    <p><b>Rest genes:</b>{" "}
                        {genes.map(gene => <Link key={"link_gene_tu_"+gene._id} style={{ marginRight: "5px" }} to={"/gene/" + gene._id} ><b>{gene.name}</b></Link>)}
                    </p>
                )}
            </div>

        </div>
    )
}