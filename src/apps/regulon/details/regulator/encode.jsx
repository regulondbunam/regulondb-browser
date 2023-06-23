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
                                    <Link key={gene.gene_id} to={"/gene/" + gene._id} >
                                        <div className={"cell_content"} >
                                            <div>
                                                <p style={{ fontSize: "8px" }} >{gene._id}</p>
                                            </div>
                                            <div>
                                                <p style={{ fontSize: "16px" }} dangerouslySetInnerHTML={{ __html: gene.name }} />
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
                                <Link key={operon.operon_id} to={"/operon/" + operon._id} >
                                    <div className={"cell_content"} >
                                        <div>
                                            <p style={{ fontSize: "8px" }} >{operon._id}</p>
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