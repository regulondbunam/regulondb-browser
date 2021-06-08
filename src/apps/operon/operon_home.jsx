import React, { useState } from "react";
import {GetInfo} from "./webServices/operon_ws"
import Table from './components/operon_table'

const Home = ({ conf }) => {
  const [_data, set_data] = useState();
  // eslint-disable-next-line no-unused-vars
  const [_find, set_find] = useState();
  const [_state, set_state] = useState();
  const [_limit, set_limit] = useState(50);
  // eslint-disable-next-line no-unused-vars
  const [_page, set_page] = useState(0);
  if (_state === "done") {
    if (_data != null) {
      return (
        <div>
          <Description
            conf={conf}
            limit={_limit}
            setLimit={(limit) => { set_limit(limit); set_state("loading")}}
          />
          <Table data={dataFormat(_data)} title="Operons" href_base="/operon/" />
        </div>
      )
      //<Table data={dataFormat(_data)} />
    } else {
      return (
        <div>
          error
        </div>
      )
    }
  }
  return (
    <div>
      <GetInfo
        resoultsData={(data) => { set_data(data) }}
        resoultsFound={(find) => { set_find(find) }}
        status={(state) => { set_state(state) }}
        limit={_limit} page={_page}
      />
      <Description
        conf={conf}
        limit={_limit}
        setLimit={(limit) => { set_limit(limit) }}
      />
      {
        _state==="loading"
        ?"loading"
        :""
      }
      {
        _state==="error"
        ?"error"
        :""
      }
      
    </div>

  );
};

export default Home;

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.limit}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let limit = parseInt(event.target.value,10)
    console.log(limit)
    if(limit<=0 || !limit){
      this.setState({value:0})
    }else{
      this.props.setLimit(limit);
    }
    
  }

  render() {
    const {
      conf,
    } = this.props
    return (
      <>
        <br />
        <br />
        <div dangerouslySetInnerHTML={{ __html: conf.description }} />
        Displayed Operons:
        <br />
        <input type="number"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <br />
      </>
    );
  }
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