import React, { useState } from "react";

const elementData = [
  { name: "gene" },
  { name: "promoter" },
  { name: "operon" },
  { name: "tf binding site" },
  { name: "rna" },
  { name: "riboswitch" },
  { name: "traslational attenuattor" },
  { name: "trascriptional attenuattor" },
  { name: "ppGpp" }
];

export default function Form({
  onGo = () => { },
  onReset = () => { },
  minbp = 1,
  maxbp = 4639676
}) {
  function setValues() {
    let posL = document.getElementById("posL").value;
    let posR = document.getElementById("posR").value;
    let strand = document.querySelector('input[name="strand"]:checked').value;
    let covered = document.getElementById("covered").checked;
    let geneticElement = [];
    elements.map((e) => {
      if (e.isChecked) {
        geneticElement.push(e.name);
      }
      return "";
    });
    if (posR-posL>200000) {
      alert("sorry the range is too large to process it.");
      return undefined;
    }
    if (posL > posR) {
      alert("Left position has to be smaller than right position.");
      return undefined;
    }
    if (geneticElement.length < 1) {
      alert("No genetic element selected for viewing");
      return undefined;
    }
    let response = {
      posL: posL,
      posR: posR,
      strand: strand,
      covered: covered,
      geneticElement: geneticElement
    };
    return response;
  }

  const [elements, setElements] = useState(elementData);

  const handleChange = (e) => {
    console.log(typeof (e))
    const { name, checked } = e.target;
    if (name === "checkAll") {
      let tempElement = elements.map((element) => {
        return { ...element, isChecked: checked };
      });
      setElements(tempElement);
    } else {
      let tempUser = elements.map((element) =>
        element.name === name ? { ...element, isChecked: checked } : element
      );
      setElements(tempUser);
    }
  };

  const resetInput = (e) => {
    document.getElementById("posL").value = "";
    document.getElementById("posR").value = "";
    document.getElementById("both").checked = true;
    document.getElementById("covered").checked = true;
    setElements(elementData);
  };
  const Demo = (e) => {
    document.getElementById("posL").value = "2306972";
    document.getElementById("posR").value = "2311534";
    document.getElementById("both").checked = true;
    document.getElementById("covered").checked = true;
    let tempElement = elements.map((element) => {
      return { ...element, isChecked: true };
    });
    setElements(tempElement);
  };

  return (
    <div>
      <label>
        Absolute genome left position:
        <input id="posL" type="number" min={minbp} max={maxbp} />
        (1-4639676)
      </label>
      <br />
      <label>
        Absolute genome rigth position:
        <input id="posR" type="number" min={minbp} max={maxbp} />
        (1-4639676)
      </label>
      <br />
      <label>Strand:</label>
      <br />
      <fieldset>
        <input type="radio" name="strand" value="forward" onChange={() => { }} />
        <label>forward</label>
        <input type="radio" name="strand" value="reverse" onChange={() => { }} />
        <label>reverse</label>
        <input
          id="both"
          type="radio"
          name="strand"
          value="both"
          defaultChecked={true}
          onChange={() => { }}
        />
        <label>both</label>
        <br />
      </fieldset>
      <label>Covered:</label>
      <br />
      <input
        id="covered"
        type="checkbox"
        defaultChecked={true}
        onChange={() => { }}
      />
      <label>
        (Draw only the elements that are completely contained in the selected
        range)
      </label>
      <br />

      <div>
        <input
          type="checkbox"
          name="checkAll"
          id="checkAll"
          checked={!elements.some((element) => element?.isChecked !== true)}
          onChange={handleChange}
        />
        <label>All</label>
      </div>
      {elements.map((element, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={element.name}
            name={element.name}
            checked={element?.isChecked || false}
            onChange={handleChange}
          />
          <label>{element.name}</label>
        </div>
      ))}
      <button
        onClick={() => {
          onGo(setValues());
        }}
      >
        Go
      </button>
      <button
        className="accent"
        style={{ marginRight: "2%", marginLeft: "2%" }}
        onClick={() => {
          onReset(true)
          resetInput()
        }}
      >
        Reset
      </button>
      <button
        id="demo"
        onClick={(e) => Demo(e)}
      >
        Demo
      </button>
    </div>
  );
}
