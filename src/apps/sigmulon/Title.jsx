import { Link } from "react-router-dom";
import { Cover, DataVerifier } from "../../components/ui-components";
import "./title.css";

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
            <p>
              <b>Gene:</b>
              <Link to={"/gene" + sigmaFactor.gene._id}>
                <span
                  dangerouslySetInnerHTML={{ __html: sigmaFactor.gene.name }}
                />
              </Link>
            </p>
            <p>
              <b>Synonyms:</b>
              <span
                dangerouslySetInnerHTML={{
                  __html: " " + sigmaFactor.synonyms.join(", "),
                }}
              />
            </p>
            {DataVerifier.isValidObject(statistics) && (
              <p>
                <b>Statistics: </b>
                  {Object.keys(statistics).map((key) => {
                    if (key === "genes" || key === "promoters" || key === "cotranscriptionFactors") {
                      return key+" "+statistics[key]+" "
                    }
                    return null;
                  })}
              </p>
            )}
          </>
        )}
      </Cover>
    </div>
  );
};

export default Title;
