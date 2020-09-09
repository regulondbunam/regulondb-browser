import React from 'react';
import Style from './style.module.css'



const Spinner = ({
    children
}) => {
    return (
        <>
        <div style={{width: '100%'}}>
            {children}
        </div>
        <div className={Style.tileCssAnimationsDemo3}>
            <span>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </span>
        </div>
        
        </>
    );
}

export default Spinner;