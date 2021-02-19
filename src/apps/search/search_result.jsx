import React, { useState } from "react";
import { Cover } from "../../components/ui-components/ui_components";
import SearchGenes from "./tools/search_genes";

const SearchResults = ({ keyword, conf }) => {
  const [_genFound, set_geneFound] = useState();
  const [_state, set_state] = useState("");
  let state = _state;
  let title = "Search Tool search result";
  switch (_state) {
    case "loading":
      title = `Searching "${keyword}" Information`;
      break;
    case "done":
      let totalResults = _genFound + 0;
      title = `Search results for "${keyword}" (${_genFound})`;
      if (totalResults === 0) {
        title = "We did not find any results";
        state = "error";
      }
      break;
    case "error":
      title = "Sorry we have technical difficulties, please try again later";
      break;
    default:
      break;
  }
  return (
    <>
      <Cover state={state}>
        <h1 assistentvalue={"Pagina de Resultado de Busqueda"}>{title}</h1>
      </Cover>
      <article>
        <br />
        {CollectionIndex(conf.collections, _genFound)}
        <br />
        <br />

        <SearchGenes
          geneStatus={(state) => {
            set_state(state);
          }}
          keyword={keyword}
          geneFounds={(nGene) => {
            set_geneFound(nGene);
          }}
        />
      </article>
    </>
  );
};


function CollectionIndex(collections, nGene) {
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <tr>
            <td key={`collections_Genes`}>
              <a href={`#table_Genes`}>{`Genes (${nGene})`}</a>&nbsp;
            </td>
            <td key={`collections_Operones`}>
              <a href={`#table_Operon`}>{`Operones (0)`}</a>&nbsp;
            </td>
            <td key={`collections_Operones`}>
              <a href={`#table_Operon`}>{`Gensor Unit (0)`}</a>&nbsp;
            </td>
            <td key={`collections_Operones`}>
              <a href={`#table_Operon`}>{`Regulon (0)`}</a>&nbsp;
            </td>
            <td key={`collections_Operones`}>
              <a href={`#table_Operon`}>{`Sigmulon (0)`}</a>&nbsp;
            </td>
            <td key={`collections_Operones`}>
              <a href={`#table_Operon`}>{`sRNA (0)`}</a>&nbsp;
            </td>
            <td key={`collections_Operones`}>
              <a href={`#table_Operon`}>{`Grow Conditions (0)`}</a>&nbsp;
            </td>
          </tr>
        </tr>
      </tbody>
    </table>
  );
}

export default SearchResults;
