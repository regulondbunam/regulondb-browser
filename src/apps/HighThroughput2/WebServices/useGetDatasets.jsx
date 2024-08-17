import { useLazyQuery, useQuery, gql } from "@apollo/client";
import { DataVerifier } from "../../../components/ui-components";

export function useInitDatasetsByDatasetType(datasetType,setDatasets) {
  const { data, loading, error } = useQuery(query,{
    variables:{
       advancedSearch: `${datasetType}[collectionData.type]`
    },
    onCompleted: (data) => {
      if (DataVerifier.isValidArray(data?.getDatasetsFromSearch)) {
        setDatasets(data?.getDatasetsFromSearch);
      }
    },
  });

  return{ data, loading, error };
}

export default function useGetDatasets() {
  const [getDatasets, { loading, error }] = useLazyQuery(query);

  const getDatasetsByDatasetType = (datasetType, setDatasets = () => {}) => {
    getDatasets({
      variables: {
        advancedSearch: `${datasetType}[collectionData.type]`,
      },
      onCompleted: (data) => {
        if (DataVerifier.isValidArray(data?.getDatasetsFromSearch)) {
          setDatasets(data?.getDatasetsFromSearch);
        }
      },
    });
  };
  return [getDatasetsByDatasetType, { loading, error }];
}

const query = gql`
  query GetDatasetsFromSearch($advancedSearch: String) {
    getDatasetsFromSearch(advancedSearch: $advancedSearch) {
      _id
      assemblyGenomeId
      collectionData {
        source
        type
      }
      cutOff
      datasetType
      experimentCondition
      growthConditions {
        organism
        geneticBackground
        medium
        aeration
        temperature
        ph
        pressure
        opticalDensity
        growthPhase
        growthRate
        vesselType
        aerationSpeed
        mediumSupplements
        otherTerms
      }
      nlpGrowthConditionsId
      objectsTested {
        _id
        name
        genes {
          _id
          name
        }
      }
      publications {
        authors
        title
      }
      sample {
        title
      }
      sourceSerie {
        title
        strategy
        platform {
          title
        }
      }
    }
  }
`;
