import { useEffect } from "react";
import Style from "./anchorNav.module.css"

export function Anchor({ id, label, select = false, setId = () => { } }) {
    return (
        <li id={id} onClick={() => { setId(id) }} className={`li ${select ? Style.liSelect : Style.li}`}  >
            {label}
        </li>
    )
}

export function AnchorBox({ idSelect, onChange, anchors = [] }) {

    useEffect(() => {
        const anchorSel = document.getElementById("anchor_list_style")
        if (anchorSel) {
            const optionSelect = document.getElementById(idSelect)

            if (optionSelect) {
                let initPosition = anchorSel.offsetTop
                let destPosition = optionSelect.offsetTop
                let interval = setInterval(function () {
                    if (anchorSel.offsetTop === optionSelect.offsetTop + 8) {
                        clearInterval(interval);
                    }
                    if (destPosition > initPosition) {
                        anchorSel.style.top = (anchorSel.offsetTop + 1) + "px"
                        if (anchorSel.offsetTop > destPosition) {
                            clearInterval(interval);
                        }
                    } else {
                        anchorSel.style.top = (anchorSel.offsetTop - 1) + "px"
                        if (anchorSel.offsetTop < destPosition) {
                            clearInterval(interval);
                        }
                    }
                }, 2)
                //console.log(optionSelect.offsetTop);

            }
        }
    }, [idSelect]);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "95% 5%", }}>
            <div>
                <ul style={{ fontSize: "14px", textAlign: "end" }} >
                    {anchors.map((anchor, index) => (
                        <Anchor key={"anchor_" + index + "_" + anchor.id}
                            id={anchor.id}
                            label={anchor.label}
                            select={idSelect === anchor.id}
                            setId={onChange}
                        />
                    ))}
                </ul>
            </div>
            <div>
                {idSelect && (
                    <div id="anchor_list_style"
                        style={{
                            marginLeft: "2px",
                            position: "absolute",
                            height: "8px",
                            width: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#3D779B",
                        }} />
                )}

            </div>
        </div>
    )
}