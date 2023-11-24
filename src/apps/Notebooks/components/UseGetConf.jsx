import {useState} from "react"

export default function useGetConf(miliSecons = 1000){
    const [conf, setConf ] = useState(false);
    if(!conf){
        setTimeout(() => {
            console.log("Hola soy useGetConf");
            setConf(true)
          }, miliSecons);
    }
    return {conf}
}