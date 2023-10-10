import React from "react";
import { Link } from "react-router-dom";
import ExternalRef from "./externalRef";
import Note from "./note";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query getIDRegulon($advanceSearch: String) {
    getRegulonBy(advancedSearch: $advanceSearch) {
      data {
        _id
      }
    }
  }
`;

export function ObjectTested({ obj, i }) {
  const { data, loading, error } = useQuery(query, {
    variables: {
      advanceSearch: `${obj.name}[regulator.name]`,
    },
  });
  let regulonId;
  if (data) {
    regulonId = data.getRegulonBy.data[0]._id;
  }
  return (
    <div>
      {regulonId ? (
        <Link to={"/regulon/" + regulonId}>
          <h3>{obj.name}</h3>
        </Link>
      ) : (
        <h3>{obj.name}</h3>
      )}

      {obj.genes.length > 0 && linkGenes(obj.genes)}

      {obj.synonyms.length > 0 && (
        <div>
          <p>
            Synonyms:
            {obj.synonyms.join(", ")}
          </p>
        </div>
      )}
      {obj.externalCrossReferences.length > 0 && (
        <div>
          <p>External cross references:</p>
          <ExternalRef externalRef={obj.externalCrossReferences} />
        </div>
      )}
      {obj?.note && <Note note={obj.note} />}
      <hr />
    </div>
  );
}

export default function TranscriptionFactor({ objectsTested }) {
  return (
    <div style={{ marginLeft: "5%" }} id={`dataset_objTested`}>
      {objectsTested.map((obj, i) => (
        <ObjectTested obj={obj} i={i} key={obj.name + i} />
      ))}
    </div>
  );
}

function linkGenes(genes = []) {
  if (window.IN_URL.isEmbed) {
    return (
      <div>
        {genes.map((gen) => {
          return (
            <p key={gen._id} style={{ fontSize: "16px" }}>
              {gen.name}
            </p>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      {genes.map((gen) => {
        return (
          <p  >Gene:{" "}
          <Link
            key={gen._id}
            style={{ fontSize: "16px" }}
            to={`/gene/${gen._id}`}
          >
            {gen.name}
          </Link>
          </p>
        );
      })}
    </div>
  );
}
