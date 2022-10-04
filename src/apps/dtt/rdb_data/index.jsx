import React, { useState } from "react";
import Form from "./form";
import Table from "./table";
import DrawingTracesTool from "../../../components/DrawingTracesTool";

function RDBdata() {
  const [_formData, set_formData] = useState();
  const [_geneticElements, set_geneticElements] = useState();
  return (
    <div>
      <div style={{marginLeft: "10%",marginRight: "10%"}}>
        <h2>Drawing Traces from RegulonDB</h2>
        <Form
          onDraw={(formData) => {
            set_formData(formData);
          }}
          onReset={()=>{set_formData(undefined);set_geneticElements(undefined)}}
        />
        <br />
        {_geneticElements && <Table geneticElements={_geneticElements} />}
      </div>
      <div>

      </div>
      {_formData && (
        <div>
          <DrawingTracesTool
            id={"rdb_dti_001"}
            context={"dti"}
            height={300}
            leftEndPosition={_formData.leftEndPosition}
            rightEndPosition={_formData.rightEndPosition}
            strand={_formData.strand}
            covered={_formData.covered}
            objectType={_formData.objectType}
            getGeneticElements={(ge)=>{set_geneticElements(ge)}}
          />
        </div>
      )}
    </div>
  );
}

export default RDBdata;
