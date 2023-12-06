import { useEffect, useState } from "react";
import Style from "./style.module.css"

//funcion descarga el html del proseso de rmd
function resolveHTML(sethtml, htmlURL = "") {
    fetch(htmlURL)
        .then((response) => response.text())
        .then((html) => {
            sethtml(html);
        })
        .catch((error) => {
            console.error(error);
            sethtml("error");
        });
}

export default function ViewHTML({rawUrl}) {
    const [htmlNotebook, sethtmlNotebook] = useState();

    useEffect(() => {
        if (!htmlNotebook) {
            resolveHTML(sethtmlNotebook, rawUrl);
        }
    }, [htmlNotebook, rawUrl]);


    return(
        <div className={Style.documentContainer}>
              <iframe
                style={{ width: "100%", height: "100%", backgroundColor: "white" }}
                srcDoc={htmlNotebook}
                title="Notebook"
              />
            </div>
    )
}