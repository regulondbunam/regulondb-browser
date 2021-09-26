import React, { useState, useEffect } from "react";
import GetAllGenes from "./webServices/allGenes/allGenes";
import Table from "./components/gene_table";
import { SpinnerCircle, IconButton, Button } from "../../components/ui-components/ui_components";
const Home = ({ conf }) => {

  const [_data, set_data] = useState()
  const [_pag, set_pag] = useState(0)
  const [_state, set_state] = useState()
  // eslint-disable-next-line no-unused-vars
  const [_limit, set_limit] = useState(20)
  const [_pagination, set_pagination] = useState()

  useEffect(() => {
    const COVER = document.getElementById("cover_gene_context")
    if (COVER) {
      const COVER_REACTION = new CustomEvent('coverGene', {
        bubbles: true,
        detail: {
          state: _state,
          title: "Gene",
          data: undefined
        }
      });
      COVER.dispatchEvent(COVER_REACTION);
    }
  }, [_state])


  return (
    <article>
      <p>
        A gene is the segment of DNA involved in producing a polypeptide chain
        or stable RNA; it includes regions preceding and following the coding
        region (leader and trailer).
      </p>
      <table className="table_content">
        <thead>
          <tr>
            <th><h2 style={{ marginBottom: "0" }}>All Genes</h2></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style={{overflow: "auto", height: "400px"}}>
              {
                _data && _pagination
                  ? Table(_data)
                  : <div>
                    <SpinnerCircle />
                    <GetAllGenes
                      limit={_limit}
                      page={_pag}
                      status={(state) => { set_state(state) }}
                      resultsData={(data) => { set_data(data) }}
                      pagination={(pagination) => { set_pagination(pagination) }}
                    />
                  </div>
              }
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <ContorlPagination set_data={(data) => { set_data(data) }} set_pag={(pag) => { set_pag(pag) }} pagination={_pagination} />

    </article>
  )
};

export default Home;


function ContorlPagination({
  set_pag = () => { },
  set_data = () => { },
  pagination = {}
}) {
  let nextPage = pagination?.hasNextPage
  let prevPage = pagination?.currentPage === 0
  return (
    <div style={{ paddingTop: "3px" }}>
      <Button style={styBtn}
        onClick={() => {
          set_pag(0)
          set_data(undefined)
        }}
      >
        first page
      </Button>
      <IconButton disabled={prevPage} style={styBtn} icon="keyboard_arrow_left"
        onClick={() => {
          set_pag(pagination?.currentPage - 1)
          set_data(undefined)
        }}
      />
      <p style={styBtn}>
        {`Page: ${pagination?.currentPage} of ${pagination?.lastPage}`}
      </p>
      <IconButton disabled={!nextPage} style={styBtn} icon="keyboard_arrow_right"
        onClick={() => {
          set_pag(pagination?.currentPage + 1)
          set_data(undefined)
        }}
      />
      <Button disabled={false} style={styBtn}
        onClick={() => {
          set_pag(pagination?.lastPage)
          set_data(undefined)
        }}
      >
        last page
      </Button>
    </div>
  )
}

const styBtn = {
  float: "left",
  marginRight: "5px",
}