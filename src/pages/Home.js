import React from 'react';
import CoverHome from './components/home/CoverHome'
import BodyHome from './components/home/BodyHome'

const HOME = () => {
    return (
        <>
            <CoverHome />
            <div style={{
                padding: "3% 10% 2% 10%"
            }}>
                <BodyHome /> 
            </div>
            <div style={{marginLeft: "50px"}}>
            <h1>Title 1</h1>
            <h2>Title 2</h2>
            <h3>Title 3</h3>
            <p>
                ajnsdkaa casa aisjdoiasdj asjakc jandsjnajsd jdaksd ijoisdasdn
            </p>
            </div>
            
               
        </>
    );
}

export default HOME;