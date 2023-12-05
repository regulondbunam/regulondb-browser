import {useState, useEffect} from "react"

//custom hook

/**
 * Custom hook para descargar la configuracion de la 
 * aplicacion notebook, situada en el repositorio
 * regulondb-unam/notebooks
 * @return {object} conf contiene la configuracion de la aplicacion 
 */
export default function useGetConf(){
    //body function -> Realiza todo los procesos antes de devolverlos
    const [conf, setConf ] = useState();

    useEffect(() => {
        if(!conf){
            const url = "https://raw.githubusercontent.com/regulondbunam/notebooks/master/conf.json"
        fetchData(url).then((data)=>{
            if(data){
                setConf(data)
            }
        })
        }
        
    },[conf])    
   
    
    //retun function -> Devuelve variables resultado de un proceso
    return conf
}


async function fetchData(url){
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error code 01 no se pudo optener la configuracion desde GitHub');
      }
      const data = await response.json();
      return data
    } catch (error) {
      console.error(error);
      return {error: "ERROR NOTEBOOKS_01"}
    }
  };