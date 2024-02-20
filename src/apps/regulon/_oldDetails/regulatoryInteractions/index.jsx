import React, { useMemo } from "react";
import {
  FilterTable,
  DataVerifier,
} from "../../../../components/ui-components";
import { Link } from "react-router-dom";
import {
  ParagraphCitations,
  PC_VARIANTS,
  CITATION_SIZE,
} from "../../../../components/datamartSchema";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//import Map from "../../../FeatureMaps/Map";

const COLUMNS = [
  {
    id: "activeConformation",
    header: "Active Conformation",
    columns: [
      {
        id: "activeConformation_name",
        header: "name",
        filter: "fuzzyText",
        accessorKey: "_activeConformation_name",
        cell: (info) => (
          <p dangerouslySetInnerHTML={{ __html: info.getValue() }} />
        ),
      },
    ],
  },
  {
    id: "regulatoryInteraction",
    header: "Regulatory Interaction",
    columns: [
      {
        id: "regulatoryInteraction_function",
        header: "Function",
        filter: "fuzzyText",
        accessorKey: "_regulatoryInteraction_function",
      },
    ],
  },
  {
    id: "regulatedEntity",
    header: "Regulated Entity",
    columns: [
      {
        id: "regulatedEntity_name",
        filter: "fuzzyText",
        header: "name",
        accessorKey: "_regulatedEntity_name",
      },
      {
        id: "regulatedEntity_type",
        filter: "fuzzyText",
        header: "type",
        accessorKey: "_regulatedEntity_type",
      },
    ],
  },
  {
    id: "regulatoryInteraction_distanceTo",
    header: "Distance to",
    columns: [
      {
        id: "regulatoryInteraction_distanceTo_gene",
        filter: "fuzzyText",
        header: "First Gene",
        accessorKey: "_distanceGene",
      },
      {
        id: "regulatoryInteraction_distanceTo_promoter",
        filter: "fuzzyText",
        header: "Promoter",
        accessorKey: "_distancePromoter",
      },
    ],
  },
  {
    id: "regulatedGenes",
    header: "Regulated Gene",
    columns: [
      {
        id: "regulatedGenes_name",
        header: "name",
        accessorKey: "_regulatedGenes_name",
        filter: "fuzzyText",
        cell: (info) => {
          const genes = info.row.original.regulatedGenes;
          return (
            <>
              {genes.map((gene) => (
                <Link
                  key={
                    "ri_" + info.row.original.id + "_regulatedGene_" + gene._id
                  }
                  to={"/gene/" + gene._id}
                >
                  <p dangerouslySetInnerHTML={{ __html: gene.name }} />
                </Link>
              ))}
            </>
          );
        },
      },
    ],
  },
  {
    id: "regulatoryBindingSite",
    header: "Regulatory BindingSite",
    columns: [
      {
        id: "regulatoryBindingSite_leftPos",
        filter: "fuzzyText",
        header: "LeftPos",
        accessorKey: "_regulatoryBindingSite_LeftPos",
      },
      {
        id: "regulatoryBindingSite_RightPos",
        filter: "fuzzyText",
        header: "RightPos",
        accessorKey: "_regulatoryBindingSite_RightPos",
      },
      {
        id: "regulatoryBindingSite_strand",
        filter: "fuzzyText",
        header: "Strand",
        accessorKey: "_regulatoryBindingSite_strand",
      },
      {
        id: "regulatoryBindingSite_sequence",
        filter: "fuzzyText",
        header: "Sequence",
        accessorKey: "_regulatoryBindingSite_sequence",
      },
    ],
  },
  {
    id: "citations",
    header: "Citations",
    accessorKey: "_citations",
    filter: "fuzzyText",
    cell: (info) => {
      const citations = info.row.original.citations;
      const allCitations = info.row.original.allCitations;
      return (
        <ParagraphCitations
          variant={PC_VARIANTS.paragraph}
          citationSize={CITATION_SIZE.ONLY_INDEX}
          allCitations={allCitations}
          citations={citations}
        />
      );
    },
  },
];

function formatData(regulatoryInteractions = [], allCitations) {
  let data = [];
  if (DataVerifier.isValidArray(regulatoryInteractions)) {
    regulatoryInteractions.forEach((ri, index) => {
      let _regulatedEntity_name = "";
      let _regulatedEntity_type = "";
      if (DataVerifier.isValidObject(ri.regulatedEntity)) {
        _regulatedEntity_name = ri.regulatedEntity.name;
        _regulatedEntity_type =
          ri.regulatedEntity.type === "transcriptionUnit"
            ? "TU"
            : ri.regulatedEntity.type;
      }
      let _activeConformation_name = "";
      let _activeConformation_type = "";
      if (DataVerifier.isValidObject(ri.activeConformation)) {
        _activeConformation_name = ri.activeConformation.name;
        _activeConformation_type = ri.activeConformation.type;
      }
      let _regulatedGenes_name = "";
      let regulatedGenes = [];
      if (DataVerifier.isValidArray(ri.regulatedGenes)) {
        _regulatedGenes_name = ri.regulatedGenes
          .map((gene) => gene.name)
          .join("; ");
        regulatedGenes = ri.regulatedGenes;
      }
      let _regulatoryInteraction_function = ri.function;
      let _distanceGene = ri.distanceToFirstGene;
      let _distancePromoter = ri.distanceToPromoter;
      let citations = ri.citations;
      let _regulatoryBindingSite_LeftPos = "";
      let _regulatoryBindingSite_RightPos = "";
      let _regulatoryBindingSite_strand = "";
      let _regulatoryBindingSite_sequence = "";
      if (DataVerifier.isValidObject(ri.regulatoryBindingSites)) {
        if (
          DataVerifier.isValidNumber(ri.regulatoryBindingSites.leftEndPosition)
        ) {
          _regulatoryBindingSite_LeftPos =
            ri.regulatoryBindingSites.leftEndPosition;
          _regulatoryBindingSite_RightPos =
            ri.regulatoryBindingSites.rightEndPosition;
        }
        _regulatoryBindingSite_strand = ri.regulatoryBindingSites.strand;
        _regulatoryBindingSite_sequence = ri.regulatoryBindingSites.sequence;
        if (DataVerifier.isValidArray(ri.regulatoryBindingSites.citations)) {
          if (ri.regulatoryBindingSites.citations.length > citations.length)
            citations = ri.regulatoryBindingSites.citations;
        }
      }
      data.push({
        id: "ri_" + index + "_" + ri._id,
        _regulatedEntity_name: _regulatedEntity_name,
        _regulatedEntity_type: _regulatedEntity_type,
        _activeConformation_name: _activeConformation_name,
        _activeConformation_type: _activeConformation_type,
        _regulatedGenes_name: _regulatedGenes_name,
        regulatedGenes: regulatedGenes,
        _regulatoryInteraction_function: _regulatoryInteraction_function,
        _distanceGene: _distanceGene,
        _distancePromoter: _distancePromoter,
        _regulatoryBindingSite_RightPos: _regulatoryBindingSite_RightPos,
        _regulatoryBindingSite_LeftPos: _regulatoryBindingSite_LeftPos,
        _regulatoryBindingSite_strand: _regulatoryBindingSite_strand,
        _regulatoryBindingSite_sequence: _regulatoryBindingSite_sequence,
        citations: citations,
        allCitations: allCitations,
        _citations: "",
      });
    });
  }
  return data;
}

function getOverlap(l, r, positions = []) {
  positions.forEach((pos) => {
    console.log(l , pos.r , r , pos.l)
    if (l < pos.r && r > pos.l) {
      return true;
    }
  });
  return false;
}

function formatDataGraph(regulatoryInteractions = []) {
  let data = {
    map: {
      name: "",
      viewType: {
        promoter: {
          trackLeft: 0,
          trackRight: 0,
          width: 0,
          height: 0,
        },
        gene: {
          trackLeft: 0,
          trackRight: 0,
          width: 0,
          height: 0,
        },
      },
    },
    tracks: {},
  };
  const defaultHeightFeature = 15;
  regulatoryInteractions.forEach((ri) => {
    if (ri.regulatedEntity) {
      if (!data.tracks.hasOwnProperty(ri.regulatedEntity._id)) {
        let track = {
          _id: ri.regulatedEntity._id,
          label: ri.regulatedEntity.name,
          type: ri.regulatedEntity.type,
          positions: [],
          features: {},
          drawFeatures: {
            levelsReverse: 1,
            levelsForward: 1,
            widthTrack: 0,
            heightTrack: 2,
          },
        };
        data.tracks[ri.regulatedEntity._id] = track;
      }
      let sequence = "";
      let rbsSequence = "";
      if (ri.regulatoryBindingSites.sequence) {
        sequence = ri.regulatoryBindingSites.sequence;
        rbsSequence = sequence.match(/[A-Z]/g).join("");
      }
      let feature = {
        size: 0,
        sequence: sequence,
        rbsSequence: rbsSequence,
        height: defaultHeightFeature,
        level: 1,
        viewPosition: {
          promoter: {
            level: 1,
            distanceTo: undefined,
            l: undefined,
            r: undefined,
          },
          gene: {
            level: 1,
            distanceTo: undefined,
            l: undefined,
            r: undefined,
          },
        },
        ri: ri,
      };
      if (DataVerifier.isValidNumber(ri.distanceToPromoter)) {
        if (ri.distanceToPromoter < data.map.viewType.promoter.trackLeft) {
          data.map.viewType.promoter.trackLeft = ri.distanceToPromoter;
        }
        if (ri.distanceToPromoter > data.map.viewType.promoter.trackRight) {
          if (DataVerifier.isValidString(sequence)) {
            data.map.viewType.promoter.trackRight =
              ri.distanceToPromoter + sequence.length;
          }
        }
        feature.viewPosition.promoter.distanceTo = ri.distanceToPromoter;
        feature.viewPosition.promoter.l =
          ri.distanceToPromoter - rbsSequence.length;
        feature.viewPosition.promoter.r =
          ri.distanceToPromoter + rbsSequence.length;
        if (
          getOverlap(
            ri.distanceToPromoter - rbsSequence.length,
            ri.distanceToPromoter + rbsSequence.length,
            data.tracks[ri.regulatedEntity._id].positions
          )
        ) {
          feature.viewPosition.promoter.level =
            feature.viewPosition.promoter.level + 1;
        }
        data.tracks[ri.regulatedEntity._id].positions.push({
          l: ri.distanceToPromoter - rbsSequence.length,
          r: ri.distanceToPromoter + rbsSequence.length,
        });
      }
      if (DataVerifier.isValidNumber(ri.distanceToFirstGene)) {
        if (ri.distanceToFirstGene < data.map.viewType.gene.trackLeft) {
          data.map.viewType.gene.trackLeft = ri.distanceToFirstGene;
        }
        if (ri.distanceToFirstGene > data.map.viewType.gene.trackRight) {
          let sequence = ri.regulatoryBindingSites.sequence;
          if (DataVerifier.isValidString(sequence)) {
            data.map.viewType.gene.trackRight =
              ri.distanceToFirstGene + sequence.length;
          }
        }
        feature.viewPosition.gene = ri.distanceToFirstGene;
      }

      data.tracks[ri.regulatedEntity._id].features[ri._id] = feature;
    }
  });
  //data.map.width = Math.abs(data.map.trackLeft - data.map.trackRight);
  return data;
}

function RegulatoryInteractions(props) {
  const [viewOption, setViewOption] = React.useState(1);

  const handleChange = (event) => {
    setViewOption(event.target.value);
  };
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          view Option
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={viewOption}
          onChange={handleChange}
          label="View Option"
        >
          <MenuItem value={0}>RI Table</MenuItem>
          <MenuItem value={1}>Graphs-TF</MenuItem>
        </Select>
      </FormControl>
      <br />
      {viewOption === 0 && <RITable {...props} />}
      {viewOption === 1 && <RIMap {...props} />}
    </div>
  );
}

function RIMap({ regulatoryInteractions, allCitations }) {
  //console.log(regulatoryInteractions);
  const data = useMemo(() => {
    return formatDataGraph(regulatoryInteractions);
  }, [regulatoryInteractions]);
  console.log(data);
  return <></>;
  //return <Map featureData={data} />;
}

function RITable({ regulatoryInteractions, allCitations }) {
  const data = useMemo(() => {
    return formatData(regulatoryInteractions, allCitations);
  }, [regulatoryInteractions, allCitations]);
  //console.log(data);
  return <FilterTable data={data} columns={COLUMNS} />;
}

export default RegulatoryInteractions;
