import { Cover } from "../../../components/ui-components"
import { useGetGenesBySearch, useGetOperonBySearch } from "../../../components/webservices";
import Gene from "./Gene";
import Operon from "./Operon"


export default function Results({ keyword }) {

  const { genesData, loading: geneLoading, error: geneError } = useGetGenesBySearch({ search: keyword })
  const { operonsData, loading: operonsLoading, error: operonsError } = useGetOperonBySearch({ search: keyword })


  let title = `Search results for ${keyword}`

  console.log(operonsData);

  return (
    <div>
      <Cover>
        <h1>{title}</h1>
      </Cover>
      <article>
        {genesData && (
          <Gene geneData={genesData} loading={geneLoading} error={geneError} keyword={keyword} />
        )}
        {operonsData && (
          <Operon operonsData={operonsData} loading={operonsLoading} error={operonsError} keyword={keyword} />
        )}

      </article>

    </div>
  )
}



/**
 * 
 * <h2>Genes</h2>
          <div id="gene_view">
            <Gene keyword={keyword} />
          </div>
          <br />
          <h2>Operon</h2>
          <div id="operon_view">
            <Operon keyword={keyword} />
          </div>
          <br />
          <h2>Regulon</h2>
          <div id="regulon_view">
            <Regulon keyword={keyword} />
          </div>
 */