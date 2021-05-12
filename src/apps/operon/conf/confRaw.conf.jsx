
import React, { useEffect, useState } from 'react'

let url = "https://raw.githubusercontent.com/regulondbunam/RegulonDB-Browser/operon_coupling/src/apps/operon/conf/operon.conf.json"

const Conf = ({setConf}) => {
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
                    }
                }
            }
        }else{
            console.log(file)
            setConf(file)
        }
            
    })
    return (
        <div>

        </div>
    )
}

export default  Conf
