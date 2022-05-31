import React, {useState} from 'react'

export default function WebServices({datamart_name, setData=()=>{}}) {
    const [_data, set_data] = useState()
    switch (datamart_name) {
        case 'getOperonBy':
            
            break;
        default:
            console.error(`DataProvider: datamart_name[${datamart_name}] not found`)
            return <></>
    }
    return null
}
