import { useParams } from "react-router-dom";
import Home from "./home";
import Details from "./details";

function SRNA() {
  let { srnaId } = useParams();

  if (srnaId) {
    return(
      <Details srnaId={srnaId} />
    )
  }

  return (
    <div>
      <Home />
    </div>
  );
}

export default SRNA;    