import React, { useState } from "react";
import Form from "./form";
import Table from "./table";
import DrawTrace from "./drawTrace";


function RDBdata({dataForm}) {
  const [_formData, set_formData] = useState(dataForm);
  const [_geneticElements, set_geneticElements] = useState();
  const _height = window.innerHeight / 2;

  return (
    <div>
      <div style={{ marginLeft: "10%", marginRight: "10%" }}>
        <h2>Drawing Traces from RegulonDB</h2>
        <Form
          showForm={dataForm===undefined}
          onDraw={(formData) => {
            set_formData(formData);
          }}
          onReset={() => {
            set_formData(undefined);
            set_geneticElements(undefined);
          }}
        />
        <br />
      </div>
      {_formData && (
        <DrawTrace height={_height} set_geneticElements={(ge)=>{set_geneticElements(ge)}} formData={_formData} />
      )}
      {_geneticElements && (
        <Table height={_height} geneticElements={_geneticElements} />
      )}
    </div>
  );
}

export default RDBdata;
