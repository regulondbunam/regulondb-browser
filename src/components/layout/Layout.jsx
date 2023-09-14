import React from "react";
import Header, {idHeader} from "./header/Header";
import Menu, {idMenu} from "./menu/Menu";
import Footer, {idFooter} from "./footer/Footer";
import { Outlet } from "react-router-dom";
import { Observer } from "./Observer";

export function fullScreen(activate = false) {
  if(activate){
    document.getElementById(idHeader).style.display = "none"
    document.getElementById(idMenu).style.display = "none"
    document.getElementById(idFooter).style.display = "none"
  }else{
    document.getElementById(idHeader).style.display = "inline"
    document.getElementById(idMenu).style.display = "inline"
    document.getElementById(idFooter).style.display = "inline"
  }
}

const Layout = () => {
  const isHome =
    window.location.pathname === "/home" || window.location.pathname === "/";
  //console.log(window.location.pathname);
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Observer />
      <Header  isHome={isHome} />
      <Menu />
      <div style={{ minHeight: "75vh", position: "relative" }}>
        <Outlet />
      </div>
      <Footer />
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
