import React from "react";
import { useQuery, gql } from "@apollo/client";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import GeneTable from "./geneTable";
import CoexpressionTable from "./coexpressionTable";
import { DataVerifier } from "../../../components/ui-components";

export const QUERY_getCoexpressionRank = gql`
  query getCoexpressionRank($name: String) {
    getTopCoexpressionRanking(gene: $name) {
      gene {
        _id
        locusTag
        name
      }
      rank
      rgbColor
    }
  }
`;

export default function GeneCoexpression({ genes }) {
  //console.log(genes);
  const [value, setValue] = React.useState(genes[0]._id);
  const gene = genes.find((gn) => gn._id === value);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
        }}
      >
        {genes.map((gene, index) => {
          return (
            <Tab
              value={gene._id}
              key={"tab_" + index + "_" + gene._id}
              sx={{ textTransform: "none" }}
              label={
                <p>
                  <b dangerouslySetInnerHTML={{ __html: gene.gene.name }} />
                </p>
              }
            />
          );
        })}
      </Tabs>
      {gene && <Info gene={gene} />}
    </Box>
  );
}

function Info({ gene }) {
  //console.log(gene);
  const { loading, error, data } = useQuery(QUERY_getCoexpressionRank, {
    variables: { name: gene.gene.name },
  });
  return (
    <div>
      <h2>{`Gene ${gene.gene.name}`}</h2>
      <GeneTable gene={gene} />
      <div>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {DataVerifier.isValidArray(data?.getTopCoexpressionRanking) && <CoexpressionTable rankings={data.getTopCoexpressionRanking}  />}
      </div>
    </div>
  );
}
