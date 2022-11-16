import { Link } from "react-router-dom";

function EncodedFrom({ encodedFrom }) {
    return (
        <div>
            {encodedFrom.genes.length > 0 || encodedFrom.operon.length > 0 ? (
                <h2>Encoded From</h2>
            ) : (<div />)}
            <div style={{ marginLeft: "5%" }} >
                {encodedFrom.genes.length > 0 && (
                    <div>
                        <h3>Genes:</h3>
                        <div style={{display: "flex"}} >
                            {encodedFrom.genes.map(gene => {
                                return (
                                    <Link to={"/gene/" + gene.gene_id} >
                                        <div className={"cell_content"} >
                                            <div>
                                                <p style={{ fontSize: "8px" }} >{gene.gene_id}</p>
                                            </div>
                                            <div>
                                                <p style={{ fontSize: "16px" }} dangerouslySetInnerHTML={{ __html: gene.gene_name }} />
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}
                {encodedFrom.operon.length > 0 && (
                    <div>
                    <h3>Operon:</h3>
                    <div style={{display: "flex"}} >
                        {encodedFrom.operon.map(operon => {
                            return (
                                <Link to={"/operon/" + operon.operon_id} >
                                    <div className={"cell_content"} >
                                        <div>
                                            <p style={{ fontSize: "8px" }} >{operon.operon_id}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: "16px" }} dangerouslySetInnerHTML={{ __html: operon.name }} />
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                )}
            </div>

        </div>
    );
}

export default EncodedFrom;