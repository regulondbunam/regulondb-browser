import React, { useState } from "react";
import { Cover } from "../../components/ui-components/ui_components";
import SearchGenes from "./tools/search_genes";
import SearchOperon from "./tools/search_operon"

const SearchResults = ({ keyword, conf }) => {
  const [_foundGene, set_foundGene] = useState(0);
  const [_foundOperon, set_foundOperon] = useState(0);
  const [_stateGene, set_stateGene] = useState("");
  const [_stateOperon, set_stateOperon] = useState("");
  let state = "";
  let title = "Search Tool search result";
  if (_stateGene === "loading" || _stateOperon === "loading") {
    title = `Searching "${keyword}" Information`;
    state = "loading"
  }
  if (_stateGene === "done" && _stateOperon === "done") {
    let totalResults = _foundOperon + _foundGene;
    title = `Search results for "${keyword}" (${totalResults})`;
    state = "done"
    if (totalResults === 0) {
      title = "We did not find any results";
      state = "error";
    }
  }
  if (_stateGene === "error" && _stateOperon === "error") {
    title = "Sorry we have technical difficulties, please try again later";
    state = "error";
  }
  return (
    <>
      <Cover state={state} id="SearchResult" >
        <h1 assistentvalue={"Pagina de Resultado de Busqueda"}>{title}</h1>
      </Cover>
      <article>
        <br />
        {CollectionIndex(_foundGene, _foundOperon)}
        <br />
        <br />
        <SearchGenes
          geneStatus={(state) => {
            set_stateGene(state);
          }}
          keyword={keyword}
          geneFounds={(nGene) => {
            set_foundGene(nGene);
          }}
        />
        <br />
        <br />
        <br />
        <SearchOperon
          geneStatus={(state) => {
            set_stateOperon(state);
          }}
          keyword={keyword}
          geneFounds={(nGene) => {
            set_foundOperon(nGene);
          }}
        />
      </article>
    </>
  );
};

function CollectionIndex(nGene, nOperon) {
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td key={`collections_Genes`}>
            <a href={`#table_Genes`}>{`Genes (${nGene})`}</a>
          </td>
          <td key={`collections_Operones`}>
                <a href={`#table_Operon`}>{`Operones (${nOperon})`}</a>
              </td>
        </tr>
      </tbody>
    </table>
  );
}

export default SearchResults;
