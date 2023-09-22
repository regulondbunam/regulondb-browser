import { Note } from "./note";
import { Summary } from "./summary";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function validateRoute(route) {
    if (route === null) {
        return false
    }
    if (route === "TBD") {
        return false
    }
    return true
}
//route
export default function Release({ release }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "85% 15%" }}>
      <div>
        <Note release={release} />
        <br />
        <Summary statistics={release.statistics} />
      </div>
      <div>
        {validateRoute(release.route) && (
          <Link to={"https://regulondbdata.ccg.unam.mx/" + release.route}>
            <Button> Download </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
