import DrawingTracesTool from "../../../components/DrawingTracesTool";

const geneticElementsData = [
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
  try {
    let _height = params.get("height") ? params.get("height") : 300;
    let _leftEndPosition = parseInt(params.get('leftEndPosition'));
    console.log(params.get('leftEndPosition'));
    let _rightEndPosition = parseInt(params.get("rightEndPosition"));
    if (!_leftEndPosition || !_rightEndPosition || _leftEndPosition>_rightEndPosition) {
        throw new Error('EndPosition error');
    }
    let _strand = params.get("strand") ? params.get("strand") : "both";
    let _covered = params.get("covered")==="true" ? true : false;
    let _objectType = params.get("objectType") ? params.get("objectType") : geneticElementsData;

    console.log(_objectType);

    return (
      <DrawingTracesTool
        id={"rdb_dti_001"}
        context={"dti"}
        height={_height}
        leftEndPosition={_leftEndPosition}
        rightEndPosition={_rightEndPosition}
        strand={_strand}
        covered={_covered}
        objectType={ geneticElementsData}
        controls={false}
      />
    );
  } catch (error) {
    console.error(error)
  }
  return <div>Error</div>;
}

export default DDTE;
