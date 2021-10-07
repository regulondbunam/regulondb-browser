import React, { useState, useEffect } from "react";
import { GetAll } from "./webServices/operon_ws"
import Table from './components/operon_table'
import { SpinnerCircle, Button, IconButton } from "../../components/ui-components/ui_components";

export default function Home({ conf }) {

  const [_data, set_data] = useState()
  const [_pag, set_pag] = useState(0)
  const [_state, set_state] = useState()
  // eslint-disable-next-line no-unused-vars
  const [_limit, set_limit] = useState(20)
  const [_pagination, set_pagination] = useState()

  useEffect(() => {
    const COVER = document.getElementById("div_cover_operon_01")
    if (COVER) {
      const COVER_REACTION = new CustomEvent('coverR', {
        bubbles: true,
        detail: {
          state: _state,
          title: conf.title,
          data: undefined
        }
      });
      COVER.dispatchEvent(COVER_REACTION);
    }
  }, [_state, conf])

  return (
    <article>
      <p dangerouslySetInnerHTML={{ __html: conf.description }} />
      <table className="table_content">
        <thead>
          <tr>
            <th><h2 style={{ marginBottom: "0" }} dangerouslySetInnerHTML={{ __html: conf.subtitle }} /></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style={{ overflow: "auto", height: "400px" }}>
                {
                  _data && _pagination
                    ? <Table data={dataFormat(_data)} href_base="/operon/" />
                    : <>
                      <SpinnerCircle />
                      <GetAll
                        limit={_limit}
                        page={_pag}
                        status={(state) => { set_state(state) }}
                        resoultsData={(data) => { set_data(data) }}
                        pagination={(pagination) => { set_pagination(pagination) }}
                      />
                    </>
                }
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <ContorlPagination set_data={(data) => { set_data(data) }} set_pag={(pag) => { set_pag(pag) }} pagination={_pagination} />
    </article>
  )
}

function dataFormat(data) {
  //console.log(data)
  let rows = [];
  if (data) {
    data.map((doc) => {
      //console.log(doc)
      const id = doc?._id;
      const tus = doc?.transcriptionUnits;
      const d = {
        name: `${doc?.operon?.name} operon`,
        tus: `contains ${doc?.operon?.statistics?.genes} genes organized in ${tus.length} TUs`,
        id: id
      };
      rows.push(d);
      return null;
    });
  }
  const columns = [
    {
      label: "name",
      field: "name"
    },
    {
      label: "tus",
      field: "tus"
    },
    {
      label: "id",
      field: "id"
    }
  ];
  return {
    columns: columns,
    rows: rows
  };
}

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