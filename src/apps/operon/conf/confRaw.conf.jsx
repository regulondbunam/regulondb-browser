
import React, { useEffect, useState } from 'react'
import confFile from "./operon.conf.json"
// eslint-disable-next-line no-unused-vars
let urlMst = "https://raw.githubusercontent.com/regulondbunam/RegulonDB-Browser/master/configuration/apps/operon.conf.json"
let urlDev = ""

const Conf = ({setConf}) => {
    const url = urlMst
    const [file,set_file] = useState()
    
    useEffect(() => {
        if(!file){
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = process;
            xhr.open("GET", url, true);
            xhr.send();
            xhr.onloadend = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 0) {
                        set_file(JSON.parse(xhr.responseText))
                    }else{
                        set_file(confFile)
                    }
                }
            }
        }else{
            //console.log(file)
            setConf(file)
        }
            
    })
    return (
        <div>

        </div>
    )
}

export default  Conf
