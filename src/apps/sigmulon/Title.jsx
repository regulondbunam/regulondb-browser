import { Link } from "react-router-dom";
import { Cover } from "../../components/ui-components";
import "./title.css"

export const Title = ({ _id, sigmaFactor, statistics, state, title }) => {
  return (
    <div>
      <Cover state={state}>
        {title ? (
          title
        ) : (
          <>
            sigmulon
            <p style={{ fontSize: "10px" }}>{_id}</p>
            <h1>{sigmaFactor.name}</h1>
            <p><b>Gene:</b><Link to={"/gene"+sigmaFactor.gene._id} ><span dangerouslySetInnerHTML={{ __html: sigmaFactor.gene.name}} /></Link></p>
            <p><b>Synonyms:</b><span dangerouslySetInnerHTML={{__html: " "+ sigmaFactor.synonyms.join(", ")}} /></p>
            <div className="cover_statistics">
              {Object.keys(statistics).map((key) => {
                if (key !== "__typename") {
                  return (
                    <div key={"statistic_" + key} className="stt_box stt_gene">
                      <p>{key}</p>
                      <p>{statistics[key]}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </>
        )}
      </Cover>
    </div>
  );
};

export default Title;
