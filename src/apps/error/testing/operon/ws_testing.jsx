import React, { useState } from 'react'
import Validate from "./webServices/validate";

export const OperonTotalResult = () => {
    const [_state,set_state] = useState()
    const [_data,set_data] = useState()
    if(_data){

    }
    
    return (
        <Validate status={(s)=>{
            set_state(s)
        }} 
        resoultsData={(d)=>{
            set_data(d)
        }}
        />
    )
}
