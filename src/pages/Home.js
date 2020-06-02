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
               
        </>
    );
}

export default HOME;