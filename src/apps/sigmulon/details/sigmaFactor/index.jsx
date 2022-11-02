import { useMemo } from "react";
import { Link } from "react-router-dom";
import Table from "./table";

function SigmaFactor({ sigmaFactor, allCitations }) {
    const jsonTABLE = useMemo(()=>{
        let jsonTableGenes = {
            columns: [
                {
                    Header: 'ID',
                    accessor: "_id",
                },
                {
                    Header: 'Name',
                    accessor: "name",
                },
            ],
            data: []
        }
        let jsonTableRegulators = {
            columns: [
                {
                    Header: 'ID',
                    accessor: "_id",
                },
                {
                    Header: 'Name',
                    accessor: "name",
                },
            ],
            data: []
        }
        if(sigmaFactor.sigmulonGenes.length > 0){
            sigmaFactor.sigmulonGenes.forEach((gene)=>{
                jsonTableGenes.data.push({_id:gene._id,name:gene.name})
            })
        }
        if(sigmaFactor.sigmulonRegulators.length > 0){
            sigmaFactor.sigmulonRegulators.forEach((regulator)=>{
                jsonTableRegulators.data.push({_id:regulator._id,name:regulator.name})
            })
        }
        return {genes: jsonTableGenes, regulators: jsonTableRegulators}
    },[sigmaFactor])
    console.log(jsonTABLE);
    return (
        <div>
            <article>
                <h2>Sigma Factor</h2>
                <div style={{ marginLeft: "5%" }} >
                    <div>
                        <p className="p_accent">Synonyms:</p>
                        <p style={{marginLeft: "2%"}} >{sigmaFactor.synonyms.join(", ")}</p>
                        
                    </div>
                    <div>
                    <p className="p_accent">Gene:</p>
                    <Link to={`/gene/${sigmaFactor.gene._id}`} ><p style={{marginLeft: "2%", fontSize: "20px"}}>{sigmaFactor.gene.name}</p></Link>
                    </div>
                </div>
                <div>
                    {sigmaFactor.sigmulonGenes.length > 0 &&(
                        <Table columns={jsonTABLE.genes.columns} data={jsonTABLE.genes.data} />
                    )}
                </div>
            </article>

        </div>
    );
}

export default SigmaFactor;