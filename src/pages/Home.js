import React from 'react';
import Header from './components/layout/Header'
import Menu from './components/layout/Menu'
import CoverHome from './components/home/CoverHome'

const HOME = () => {
    return (
        <>
            <Header />
            <Menu />
            <CoverHome />    
        </>
    );
}

export default HOME;