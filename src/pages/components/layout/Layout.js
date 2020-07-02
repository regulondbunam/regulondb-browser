import React from 'react';
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

const Layout = ({
    children
}) => {
    return (
        <>
        <Header />
        <Menu />
        <section>
        {children}
        </section>
        <footer>
        <Footer/>
        </footer>
        </>
     );
}
 
export default Layout;