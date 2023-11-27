import igv from "igv/dist/igv.esm";
import { useState } from "react";

let conf = {
  "id": "Ecoli",
  "name": "Ecoli",
  "fastaURL": "/media/raw/e_coli_k12.fna",
  "indexURL": "/media/raw/e_coli_k12.fna.fai",
  "order": 1000,
  "tracks": [
    {
      "name": "Genes",
      "type": "annotation",
      "url": "/media/raw/gff3/GeneProductSet.gff3",
      "format": "gff3",
      "color": "#000000",
      "displayMode": "EXPANDED",
    }
  ]
}

export default function IGVDraw({igvBrowser, setIgvBrowser}) {
    const [view, setView] = useState(false)
    const [genomeLoad, setGenomeLoad] = useState(false)
    let igvDiv = document.getElementById("igv-divK");
    if (igvDiv && !view) {
        setView(true)
        console.log("hola")
      igv
        .createBrowser(igvDiv)
        .then(function (browser) {
          setIgvBrowser(browser)
        });
    }
    if(view && igvBrowser){
      igvBrowser.loadGenome(conf)
    }
    return <>{correct()}</>
}


function correct() {
  setTimeout(() => {
      const igv = document.getElementsByClassName("igv-container")
      if (igv.length>1) {
          igv[0].remove()
      }
  }, 500);
}

