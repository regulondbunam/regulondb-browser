import { Remarkable } from "remarkable";
import { useEffect, useState } from "react";

//funcion descarga el md
function resolveReadme(setReadme, readmeURL = "") {
    fetch(readmeURL)
        .then((response) => response.text())
        .then((readme) => {
            setReadme(readme);
        })
        .catch((error) => {
            console.error(error);
            setReadme("error");
        });
}

export default function ViewReadme({ readmeURL }) {
    const [readme, setReadme] = useState();

    useEffect(() => {
        if (!readme) {
            resolveReadme(setReadme, readmeURL);
        }
    }, [readme, readmeURL]);

    const md = new Remarkable();
    md.set({
        html: true,
        breaks: true,
    });

    return (
        <div dangerouslySetInnerHTML={{ __html: md.render(readme) }} />
    )
}