import React, { useState } from 'react';

const ToolTip = ({
    autoShow = true,
    children,
    Tip = TipDefault,
    display = false,
    style = {}
}) => {
    const [show,setShow] = useState(display)
    if(autoShow){
        return ( 
            <div style={style} onMouseOver={()=>{setShow(true)}} onMouseLeave={()=>{setShow(!show)}}>
                {children}
                {
                    show
                    ?<Tip/>
                    :null
                }
            </div> 
            );
    }else{
        return ( 
            <div style={style}>
                {children}
                {
                    display
                    ?<Tip/>
                    :null
                }
            </div> 
            );
    }
    
}

const TipDefault = () => {
    const style = {position: "absolute", padding: '10px', boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.5)", backgroundColor: '#f4f5f5'}
    return ( 
        <div style={style}>
            hi! i'm a toolTip
        </div>
     );
}

 
export default ToolTip;