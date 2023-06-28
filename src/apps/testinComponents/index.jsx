import { Gene } from '../../components/datamartSchema//geneDatamart/gene';
import { useGetGenesBy } from '../../components/webservices/gene';


export function TestComponents() {

    const { geneData } = useGetGenesBy({_id: "RDBECOLIGNC00651"})
    console.log(geneData?.gene);
    return (
        <div>
            <h1>Components in RegulonDB</h1>
            <article>
                <h2>SchemaComponent</h2>
               {geneData &&(
                 <Gene {...geneData.gene} allCitations={geneData.allCitations} />
               )}
            </article>

        </div>
    )
}

