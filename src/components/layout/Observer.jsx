import { useEffect, useState } from "react"
import { UpdateHeader } from "./header/Header";


export function Observer(){
    const [_isHome,set_isHome] = useState(true)

    //console.log(_isHome)
    UpdateHeader(_isHome)

    useEffect(()=>{
        new MutationObserver(() => {
            const isHome =
              window.location.pathname === "/home" ||
              window.location.pathname === "/";
            if(isHome !== _isHome){
                set_isHome(isHome)
            }
            
          }).observe(document, { subtree: true, childList: true });
    },[_isHome])
    

    return <></>
}