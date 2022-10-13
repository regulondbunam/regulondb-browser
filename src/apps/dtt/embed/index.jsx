import { useQuery } from '@apollo/client';
import { query_GET_GE_Interval } from "../../../components/webservices/GeneticElementsFromInterval/gql";
import { DrawingTE } from './drawingTracesEmbed';

const geneticElementsSelection = [
  "gene",
  "promoter",
  "operon",
  "tf binding site",
  "rna",
  "riboswitch",
  "transnational_attenuator",
  "transcriptional_attenuator",
  "ppGpp",
];

function DDTE({ params }) {

  let _leftEndPosition = parseInt(params.get("leftEndPosition"));
  let _rightEndPosition = parseInt(params.get("rightEndPosition"));
  const _height = params.get("height") ? params.get("height") : 200;
  const _width = params.get("width") ? params.get("width") : 800;
  if (
    !_leftEndPosition ||
    !_rightEndPosition ||
    _leftEndPosition > _rightEndPosition
  ) {
    _leftEndPosition = 1
    _rightEndPosition = 1000
  }
  const _strand = params.get("strand") ? params.get("strand") : "both";
  const _covered = params.get("covered") === "true" ? true : false;
  // eslint-disable-next-line no-unused-vars
  const _objectType = params.get("objectType")
    ? params.get("objectType")
    : geneticElementsSelection;

  const { error, data } = useQuery(query_GET_GE_Interval,{
    variables:{
        leftEndPosition: _leftEndPosition,
        rightEndPosition: _rightEndPosition,
      }});
    
  if(data){
    DrawingTE(_height,_width,_leftEndPosition,_rightEndPosition,data["getGeneticElementsFromInterval"])
    return <div id='embed_data'></div>
  }
  if(error){
    return <div>Error</div>
  }

  return <div>i</div>;
}

export default DDTE;
