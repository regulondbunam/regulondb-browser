import React, { useState } from "react";
import GetAllGenes from "./webServices/allGenes/allGenes";
import Table from "./components/gene_table";
import { SpinnerCircle, IconButton, Button } from "../../components/ui-components/ui_components";
const Home = () => {

  const [_data, set_data] = useState()
  const [_pag, set_pag] = useState(0)
  const [_state, set_state] = useState()
  const [_limit, set_limit] = useState(20)
  const [_pagination, set_pagination] = useState()



  return (
    <article>
      <br />
      <br />
      <p>
        A gene is the segment of DNA involved in producing a polypeptide chain
        or stable RNA; it includes regions preceding and following the coding
        region (leader and trailer).
      </p>
      <h2>All Genes</h2>
      <br />
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
      <ContorlPagination set_data={(data)=>{set_data(data)}} set_pag={(pag)=>{set_pag(pag)}} pagination={_pagination} />
      <br />

    </article>
  )
};

export default Home;


function ContorlPagination({
  set_pag = () => { },
  set_data = ()=>{},
  pagination = {}
}) {
  let nextPage = pagination?.hasNextPage
  let prevPage = pagination?.currentPage === 0
  return (
    <div>
      <Button style={styBtn}
        onClick={() => {
          set_pag(0)
          set_data(undefined)
        }}
      >
        first page
      </Button>
      <IconButton disabled={prevPage} style={styBtn} icon="keyboard_arrow_left" 
        onClick={()=>{
          set_pag(pagination?.currentPage - 1)
          set_data(undefined)
        }}
      />
      <p style={styBtn}>
       {`Page: ${pagination?.currentPage} of ${pagination?.lastPage}`}
      </p>
      <IconButton disabled={!nextPage} style={styBtn} icon="keyboard_arrow_right"
        onClick={()=>{
          set_pag(pagination?.currentPage + 1)
          set_data(undefined)
        }}
      />
      <Button disabled={true} style={styBtn}
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