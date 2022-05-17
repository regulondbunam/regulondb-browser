import { withRouter } from 'react-router-dom';
import Header from './Header'
import Menu from './menu'
import Footer from './footer'
import Aside from './aside'

const Layout = ({
    location,
    children
}) => {
    const isHome = location.pathname === "/home" || location.pathname === "/"
    //console.log(window.location.origin)
    const urlPage = window.location.origin
    return (
        <div>
            <Header urlPage={urlPage} isHome={isHome} />
            <Menu />
            <section>
                <div style={{float: "left", width: '100%'}}>
                    {children}
                </div>
                {
                    !isHome
                        ? <Aside />
                        : null
                }
            </section>
            <footer>
                <Footer urlPage={urlPage} />
            </footer>
        </div>
    );
}

export default withRouter(Layout);