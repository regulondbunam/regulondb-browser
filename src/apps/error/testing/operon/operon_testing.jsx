
import React, { useState } from 'react'
import { Cover, Tabs, Button  } from "../../../../components/ui-components/ui_components";
import conf from '../../../../webServices/apollo.conf.json'

const tabs = {
    "informacion": {
      "id": "1",
      "name": "Informacion",
      "disabled": false
    },
    "ws": {
        "id": "2",
        "name": "Operon",
        "disabled": false
      }
}

export const OperonTest = () => {
    return (
        <div>
            <Cover>
             <h1>Bienvenido al Apartado de Testeo de la Aplicacion</h1>
             <p>Seleccione Opcion de Testeo</p>
            </Cover>
            <Tabs tabsObj={tabs}
                tabSelect={"01"}
                tabs={[<Welcome id="1" />, <WebSevicesTest id="2" />]}
            />
        </div>
    )
}

export default OperonTest

function Welcome(){
    return <h2>Hola n.n</h2>
}

function WebSevicesTest(){

    const [_is,set_is] = useState(false)

    return (
        <div style={{backgroundColor: "#000"}}>
            <h2 style={{color:"#FFF"}} >Testeo de Consistencia de Datos Requeridos para Operon</h2>
            <p>
                Este servicio consultara cada uno de los documentos dentro de operon, y validara si la consistencia de estos es la minima para ser desplegado en 
                la aplicacion de operon, aquellos que no pasen el test se mostran con su ID y el tipo de problema.
            </p>
            <br/>
            <Button label="Inicar con Escaneo" onClick={()=>{
                alert(`Este test consume el servicio conectado: ${conf.graphQlUrl} \n puede provocar que el servicio se sature..` )
               let a = window.confirm("Esta seguro que desea ejecutar este Test")
               if(a){
                   alert("iniciando test")
                   set_is(true)
               }else{

               }
            }} />
            <br/>
            {
                _is
                ?<>loading...</>
                :<>---</>
            }
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}