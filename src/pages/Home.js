import React from 'react';
import Header from './components/layout/Header'
import Menu from './components/layout/Menu'
import CoverHome from './components/home/CoverHome'
import BodyHome from './components/home/BodyHome'

const HOME = () => {
    return (
        <>
            <Header />
            <Menu />
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