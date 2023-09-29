import LogoRegulonDB from "./logos/regulonDB.png";
import InputSearch from "../../../apps/search/InputSearch";

export function HeaderNav({
  title,
  id = "headerNav",
  disabledSearchTool = false,
}) {
  return (
    <div id="headerNav" style={{ display: "none" }}>
      <div>
        <div>
          <img
            style={{
              maxHeight: "20px",
              maxWidth: "116px",
            }}
            src={LogoRegulonDB}
            alt="Logo RegulonDB"
          />
        </div>
        <div>
          <h1>{title}</h1>
        </div>
      </div>
      <div>{!disabledSearchTool && <InputSearch />}</div>
    </div>
  );
}
