import React from "react";
import Header from "./header/Header";
import Menu from "./menu/Menu";
import { Observer } from "./Observer";

const Layout = ({ children }) => {
  const isHome =
    window.location.pathname === "/home" || window.location.pathname === "/";
  //console.log(window.location.pathname);
  return (
    <div>
      <Observer />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Header isHome={isHome} />
      <Menu />
      {children}
    </div>
  );
};

export default Layout;

/**
 * 
 * <div class="asana-embed-container"><link rel="stylesheet" href="https://form.asana.com/static/asana-form-embed-style.css"/><iframe class="asana-embed-iframe" src="https://form.asana.com/?k=40cYwiXSzW-Yv9-5-a9kXQ&d=1108899165642340&embed=true"></iframe><div class="asana-embed-footer"><a rel="nofollow noopener" target="_blank" class="asana-embed-footer-link" href="https://asana.com/es?utm_source=embedded_form"><span class="asana-embed-footer-text Typography Typography--s">Formulario desarrollado por</span><div class="asana-embed-footer-logo" role="img" aria-label="Logo de Asana"></div></a></div></div>
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
