import Style from "./info.module.css";
import LogoRegulonDB from "./logos/regulonDB.png";
import InputSearch from "../../../apps/search/InputSearch";

export function HeaderNav({ title }) {
    return (
        <div id="headerNav" style={{display: "none"}}  >
            <div>
                <div>
                    <img
                        className={Style.headerNav_LogoRDB}
                        src={LogoRegulonDB}
                        alt="Logo RegulonDB"
                    />
                </div>
                <div>
                    <h1>{title}</h1>
                </div>
            </div>
            <div>
                <InputSearch />
            </div>
        </div>
    )
}