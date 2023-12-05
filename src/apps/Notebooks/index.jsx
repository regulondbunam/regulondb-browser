import ViewReadme from "./ViewReadme"
import NotebooksMenu from "./NotebooksMenu"
import ViewHTML from "./ViewHTML"
import useGetConf from "./components/UseGetConf"
import { useState } from "react"
import {Cover} from "../../components/ui-components"
//importacion de modulo de estilo
import style from "./style.module.css"

export default function Notebooks() {
    //body
    const conf = useGetConf()
    const [view, setView] = useState(0)
    const [rawUrl, setRawUrl] = useState()

    const views = [
        <ViewReadme readmeURL={conf?.readme} />,
        <ViewHTML rawUrl={rawUrl} />,
    ]

    const handleUrl = (_rawUrl) => {
        setView(1)
        setRawUrl(_rawUrl)
    }


    //render
    if (!conf) {
        return <div>Cargando Notebooks...</div>
    }

    //render
    if (conf?.error) {
        return <div>Error al descargar la configuracion de Notebooks</div>
    }

    //render
    return (
        <div>
            <Cover><h1>Notebooks</h1></Cover>
            <div className={style.notebookBody} >
                <NotebooksMenu setView={setView} handleUrl={handleUrl} confNotebooks={conf.notebooks} />
                {views[view]}
            </div>
        </div>
    )
}

/** Vida de un componete
 *
- Premontaje: Ejecucion del cuermpo de la funcion 
- Montaje: Cuando un componente se agrega a la pantalla. El constructor de la clase se ejecuta cuando se monta un componente.
- Actualización: Cuando un componente recibe nuevas propiedades o estado.
- Desmontaje: Cuando un componente se elimina de la pantalla.
 * 
 */