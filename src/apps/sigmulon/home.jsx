import React, { useMemo } from "react";
import {
  Cover,
  DataVerifier,
  FilterTable,
} from "../../components/ui-components";
import { useGetObjectList } from "../../components/webservices";
import { Link } from "react-router-dom";

const COLUMNS = [
    {
      id: "sigmulonData",
      header: "Sigmulon",
      columns:[
        {
            id: "sigmulonName",
            header: "Name",
            accessorKey: "_name",
            filter: "fuzzyText",
            cell: (info) => (
                <Link to={"/sigmulon" + info.row.original.id} ><span dangerouslySetInnerHTML={{ __html: info.getValue() }} /></Link>
              ),
          },
          {
            id: "sigmulonGene",
            header: "Gene",
            accessorKey: "_gene",
            filter: "fuzzyText",
          },
          {
            id: "sigmulonSynonyms",
            header: "Synonyms",
            accessorKey: "_synonyms",
            filter: "fuzzyText",
          },
      ]
    },
    {
        id: "sigmulonStatistics",
        header: "Statistics",
        columns:[
          {
              id: "statisticsGenes",
              header: "Genes",
              accessorKey: "_genes",
              filter: "fuzzyText",
              
            },
            {
              id: "sigmulonPromoters",
              header: "Promoters",
              accessorKey: "_promoters",
              filter: "fuzzyText",
            },
            {
              id: "sigmulonSigmaFactors",
              header: "Sigma Factors",
              accessorKey: "_sigmaFactors",
              filter: "fuzzyText",
            },

            {
                id: "sigmulonTUS",
                header: "TUs",
                accessorKey: "_tus",
                filter: "fuzzyText",
              },
        ]
      }
  ];
  
  function formatData(objectsList = []) {
    let data = [];
    if (DataVerifier.isValidArray(objectsList)) {
      objectsList.forEach(({ _id, name, synonyms, sigmulonGeneName, statistics }) => {
          const {genes, sigmaFactors, promoters, transcriptionUnits} = statistics
        data.push({
          id: _id,
          _name: name,
          _gene: sigmulonGeneName ? sigmulonGeneName : "",
          _synonyms: DataVerifier.isValidArray(synonyms) ? synonyms.join(", ") : "",
          _genes: genes,
          _sigmaFactors: sigmaFactors,
          _promoters: promoters,
          _tus: transcriptionUnits
        });
      });
    }
    return data;
  }

  export default function Home() {
    const { objectsList, loading, error } = useGetObjectList({
      datamartType: "sigmulon",
    });
    let state = "done";
    let title = "Sigmulon";
    if (loading) {
      state = "loading";
      title = "loading sigmulon list";
    }
    if (error) {
      state = "error";
      title = "... Sorry, we have an error, try again later 🥲";
    }
  
    return (
      <div>
        <Cover state={state}>
          <h1>{title}</h1>
        </Cover>
        {objectsList && <LoadTable objectsList={objectsList} />}
      </div>
    );
  }
  
  function LoadTable({ objectsList }) {
    const data = useMemo(() => {
      return formatData(objectsList);
    }, [objectsList]);
    return (
      <div style={{ margin: "10px 3% 10px 3%" }}>
        <FilterTable
          data={data}
          columns={COLUMNS}
          fileName="SigmulonSummaryData"
        />
      </div>
    );
  }
  