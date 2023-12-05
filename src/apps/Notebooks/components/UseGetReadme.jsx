import {useState, useEffect} from "react"

//custom hook

/**
 * Custom hook para descargar 
 * @return {object}  
 */
export default function useGetReadme(){
    const [readme, setReadme ] = useState();
    useEffect(() => {
        if(!readme){
            const url = "https://raw.githubusercontent.com/regulondbunam/notebooks/master/conf.json"
        fetchData(url).then((data)=>{
            if(data){
                setReadme(data)
            }
        })
        }
        
    },[readme])    
   
    
    //retun function -> Devuelve variables resultado de un proceso
    return readme
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