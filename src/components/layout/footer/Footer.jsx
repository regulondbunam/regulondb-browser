import Style from "./footer.module.css"
import unamLogo from "../logos/unam_white.png"
import ccgLogo from "../logos/ccg_white.png"
import nihLogo from "../logos/nih_withe.png"
import conahcytLogo from "../logos/conahcyt_white.svg"

export default function Footer() {
    
    return(
        <div className={Style.footer} >
            <div className={Style.footerHeight} >
                <div className={Style.logos}>
                    <img src={unamLogo} alt="unam logo" className={Style.imageLogo} />
                    <img src={ccgLogo} alt="ccg logo" className={Style.imageLogo} />
                    <img src={nihLogo} alt="nih logo" className={Style.imageLogo} />
                    <img src={conahcytLogo} alt="Consejo Nacional de Humanidades Ciencia y Tecnologia logo" className={Style.imageLogo} />
                </div>
                <div className="links">
                    links
                </div>
            </div>
            <div className={Style.text} >
                texto
            </div>
        </div>
    )
}

//about us