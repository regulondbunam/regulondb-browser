import { useLazyQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  Cover,
  DataVerifier,
  Circular,
} from "../../../components/ui-components";
import { useNavigate } from "react-router-dom";

const query = gql`
  query GetGenesBy($advancedSearch: String) {
    getGenesBy(advancedSearch: $advancedSearch) {
      data {
        _id
        gene {
          name
        }
      }
    }
  }
`;

//araA araB araD AraC coexpression
export default function CoexpressionResults({ keyword = "" }) {
  const navigate = useNavigate();
  const geneList = keyword.split(" ");
  const [idList, setIdList] = useState([]);
  const [getGene, { loading }] = useLazyQuery(query);
  const progress = (idList.length * 100) / (geneList.length - 1);
  useEffect(() => {
    if (idList.length === geneList.length - 1) {
      const url =
        "/coexpression/" +
        idList
          .map((id) => {
            if (id === null) {
              return "";
            }
            if (/error/.test(id)) {
              return "";
            }
            return "geneId=" + id;
          })
          .join("&");
      navigate(url);
    }
  }, [geneList, idList, navigate]);

  if (idList.length < geneList.length - 1 && !loading) {
    const geneName = geneList[idList.length];
    if (geneName !== "coexpression") {
      getGene({
        variables: { advancedSearch: `${geneName}[gene.name]` },
        onCompleted: (data) => {
          try {
            if (DataVerifier.isValidArray(data.getGenesBy.data)) {
              const gene = data.getGenesBy.data[0];
              setIdList([...idList, gene._id]);
            } else {
              setIdList([...idList, `error:${geneName} not found`]);
            }
          } catch (error) {
            console.log("assign gene value:", error);
            setIdList([...idList, `error:${geneName} has assign valor`]);
          }
        },
        onError: (error) => {
          console.log(error);
          setIdList([...idList, `error:${geneName} has query error`]);
        },
      });
    } else {
      setIdList([...idList, null]);
    }
  }
  //geneId=RDBECOLIGNC02564&

  return (
    <div>
      <Cover state={"loading"}>
        <h1>Redirect to coexpression dataset Tool</h1>
      </Cover>
      <div>
        <Circular variant="determinate" value={progress} />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <p style={{ fontSize: "16px" }}>
            Validating gene names ({geneList.length - 1}/{idList.length})
          </p>
        </div>
        <div
          style={{
            margin: "10px 5% 0 5%",
            display: "grid",
            gridTemplateColumns: "20% 80%",
            columnGap: "20px",
          }}
        >
          <div>
            {geneList.join(",")}
            {idList.map((id, index) => (
              <p key={"comm_" + index}>{id}</p>
            ))}
          </div>
          <div>...</div>
        </div>
      </div>
    </div>
  );
}
