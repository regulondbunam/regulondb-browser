import React, { useState } from "react";
import AllOperon from "./webServices/allOperon_ws"
import Table from './components/operon_table'

const Home = ({ conf }) => {
  const [_data, set_data] = useState();
  const [_find, set_find] = useState();
  const [_state, set_state] = useState();
  const [_limit, set_limit] = useState(5);
  const [_page, set_page] = useState(0);
  console.log(_state)
  switch (_state) {
    case "loading":
      return (
        <div>
          <Description
            conf={conf} 
            limit={_limit} 
            setLimit={(limit)=>{set_limit(limit)}} 
          />
            loading
        </div>
      )
    case "error":
      return (
        <div>
          <Description
            conf={conf} 
            limit={_limit} 
            setLimit={(limit)=>{set_limit(limit)}} 
          />
            error
        </div>
      )
    case "done":
      if (_data != null) {

        return (
          <div>
            <Description
              conf={conf} 
              limit={_limit} 
              setLimit={(limit)=>{set_limit(limit)}} 
            />
            
          </div>
        )
        //<Table data={dataFormat(_data)} />
      } else {
        return (
          <div>
            <Description
              conf={conf} 
              limit={_limit} 
              setLimit={(limit)=>{set_limit(limit)}} 
            />
            error
          </div>
        )
      }
    default:
      break;
  }
  return (
    <AllOperon
      resoultsData={(data) => { set_data(data) }}
      resoultsFound={(find) => { set_find(find) }}
      status={(state)=>{set_state(state)}}
      limit={_limit} page={_page}
    />
  );
};

export default Home;

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.setLimit(event.target.value);
  }

  render() {
    const {
      conf,
      limit,
    } = this.props
    return (
      <>
        <br />
        <br />
        <div dangerouslySetInnerHTML={{ __html: conf.description }} />
        Displayed Operons:
        <br />
        <input type="number"
          value={limit}
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
      const id = doc?._id;
      const tus = doc?.transcriptionUnits;
      const d = {
        name: `${doc?.operon?.name} operon`,
        tus: `contains ## genes organized in ${tus.length} TUs`,
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