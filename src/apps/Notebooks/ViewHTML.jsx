import { useEffect, useState } from "react";

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
        <div dangerouslySetInnerHTML={{ __html: htmlNotebook }} />
    )
}