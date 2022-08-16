import React from "react";
import Header from "./header/Header";
import Menu from "./menu/Menu";
const Layout = ({ children }) => {
  const isHome = window.location.pathname === "/home" || window.location.pathname === "/"
  //console.log(window.location.pathname);
  const urlPage = window.location.origin;
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Header urlPage={urlPage} isHome={isHome} />
      <Menu />
      {children}
    </div>
  );
};

export default Layout;

/**
 * <Menu />
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
 */
