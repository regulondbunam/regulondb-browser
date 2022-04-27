import data1 from "./demo1.txt";
import data2 from "./demo2.txt";
import data3 from "./demo3.txt";
import React from "react";
import { validateData } from "./validateData";

export const Form = ({
  valueText = "",
  onSumit = () => { },
  onReset = () => { }
}) => {
  return (
    <div className="container">
      <label>Enter data according to acceptable format ...</label>
      <br />
      <textarea
        defaultValue={valueText}
        name="userData_textArea"
        id="userData_textArea"
        cols="30"
        rows="10"
        style={{ width: "100%", height: "100%" }}
      ></textarea>
      <br />
      <input id="userData_inputFile" type="file" onChange={fileUpload} />
      <br /><br />
      <button
        onClick={(e) => {
          onSumit(
            validateData(document.getElementById("userData_textArea").value)
          );
        }}
      >
        Go
      </button>
      <button
        className="accent"
        style={{ marginRight: "2%", marginLeft: "2%" }}
        onClick={(e) => {
          onReset();
          document.getElementById("userData_textArea").value = "";
          document.getElementById("userData_inputFile").value = "";
        }}
      >
        Reset
      </button>
      <button
        style={{ marginRight: "2%", marginLeft: "2%" }}
        onClick={readDemoOne}
      >
        Demo 1
      </button>
      <button
        style={{ marginRight: "2%", marginLeft: "2%" }}
        onClick={readDemoTwo}
      >
        Demo 2
      </button>
      <button
        style={{ marginRight: "2%", marginLeft: "2%" }}
        onClick={readDemoThree}
      >
        Demo 3
      </button>

    </div>
  );
};
function readDemoOne(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", data1, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        var allText = rawFile.responseText;
        document.getElementById("userData_textArea").value = allText;
      }
    }
  }
  rawFile.send(null);
}
function readDemoTwo(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", data2, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        var allText = rawFile.responseText;
        document.getElementById("userData_textArea").value = allText;
      }
    }
  }
  rawFile.send(null);
}
function readDemoThree(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", data3, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        var allText = rawFile.responseText;
        document.getElementById("userData_textArea").value = allText;
      }
    }
  }
  rawFile.send(null);
}

function readFile(file) {
  let reader = new FileReader();
  reader.onload = function () {
    document.getElementById("userData_textArea").textContent = reader.result;
  };
  reader.readAsText(file);
}

function fileUpload(e) {
  e.stopPropagation();
  e.preventDefault();

  let fileInput = document.getElementById("userData_inputFile");
  let fileRoute = fileInput.value;
  let allowExt = /(.json|.tsv|.csv)$/;

  if (!allowExt.exec(fileRoute)) {
    alert(
      "Check the extension of the files to upload. You can only upload files with extensions: .json .tsv.csv)"
    );
    fileInput.value = "";
    return false;
  }
  {
    let files = e.target.files;
    //console.log(files[0].type);
    try {
      if (Math.round(files[0].size / 1000) < 10240) {
        readFile(files[0]);
      } else {
        alert("Unsupported file size");
      }
    } catch (error) {
      console.error("no select file: " + error);
    }
  }
}
