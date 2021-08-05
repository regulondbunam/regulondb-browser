import React,{useState} from 'react'
import GetRegulatoryInteractions from '../webServices/regulon/regulatoryInteractions'

export default function RInteractions({id_regulon}) {

    const [_data, set_data] = useState()
    const [_state, set_state] = useState()

    if (_data) {
        console.log(_data)
        return(
            <div>
                {
                    JSON.stringify(_data,null," ")
                }
            </div>
        )
    }

    return <GetRegulatoryInteractions 
            id_regulon={id_regulon}
            status={state=>{set_state(state)}}
            resoultsData={(data)=>{set_data(data)}}
            />
}
