import {Cover} from "../../../components/ui-components"
import { useGetGenesBySearch } from "../../../components/webservices";
import Gene from "./Gene";


export default function Results({keyword}) {

  const {genesData,loading: geneLoading,error: geneError} = useGetGenesBySearch({search:keyword})
  
  let title = `Search results for ${keyword}`


  return(
    <div>
      <Cover>
        <h1>{title}</h1>
      </Cover>
      <article>
         <Gene geneData={genesData} loading={geneLoading} error={geneError} keyword={keyword}  />
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