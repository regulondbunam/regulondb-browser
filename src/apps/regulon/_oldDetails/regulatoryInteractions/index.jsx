import React, { useMemo } from "react";
import {
  FilterTable,
  DataVerifier,
} from "../../../../components/ui-components";
import { Link } from "react-router-dom";
import { ParagraphCitations } from "../../../../components/datamartSchema/citations/paragraph";

const COLUMNS = [
  {
    id: "regulatedEntity",
    header: "Regulated Entity",
    columns: [
      {
        id: "regulatedEntity_name",
        header: "name",
        accessorKey: "_regulatedEntity_name",
      },
      {
        id: "regulatedEntity_type",
        header: "type",
        accessorKey: "_regulatedEntity_type",
      },
    ],
  },
  {
    id: "activeConformation",
    header: "Active Conformation",
    columns: [
      {
        id: "activeConformation_name",
        header: "name",
        accessorKey: "_activeConformation_name",
        cell: (info) => (<p dangerouslySetInnerHTML={{__html: info.getValue()}} />),
      },
      {
        id: "activeConformation_type",
        header: "type",
        accessorKey: "_activeConformation_type",
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
        cell: (info) => {
          const genes = info.row.original.regulatedGenes;
          return (
            <>
              {genes.map((gene) => (
                <Link
                  key={
                    "ri_" + info.row.original.id + "_regulatedGene_" + gene._id
                  }
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
    id: "regulatoryInteraction",
    header: "Regulatory Interaction",
    columns: [
      {
        id: "regulatoryInteraction_function",
        header: "Function",
        accessorKey: "_regulatoryInteraction_function",
      },
    ],
  },
  {
    id: "regulatoryInteraction_distanceTo",
    header: "Distance to",
    columns: [
      {
        id: "regulatoryInteraction_distanceTo_gene",
        header: "First Gene",
        accessorKey: "_distanceGene",
      },
      {
        id: "regulatoryInteraction_distanceTo_promoter",
        header: "Promoter",
        accessorKey: "_distancePromoter",
      },
    ],
  },
  {
    id: "regulatoryBindingSite",
    header: "Regulatory BindingSite",
    columns: [
      {
        id: "regulatoryBindingSite_position",
        header: "Position",
        accessorKey: "_regulatoryBindingSite_position",
      },
      {
        id: "regulatoryBindingSite_strand",
        header: "Strand",
        accessorKey: "_regulatoryBindingSite_strand",
      },
      {
        id: "regulatoryBindingSite_sequence",
        header: "Sequence",
        accessorKey: "_regulatoryBindingSite_sequence",
      },
    ],
  },
  {
    id: "citations",
    header: "Citations",
    accessorKey: "_citations",
    cell: (info) => {
      const citations = info.row.original.citations;
      const allCitations = info.row.original.allCitations;
      return (
        <ParagraphCitations allCitations={allCitations} citations={citations} />
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
        _regulatedEntity_type = ri.regulatedEntity.type;
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
      let _regulatoryBindingSite_position = "";
      let _regulatoryBindingSite_strand = "";
      let _regulatoryBindingSite_sequence = "";
      if (DataVerifier.isValidObject(ri.regulatoryBindingSites)) {
        if (
          DataVerifier.isValidNumber(ri.regulatoryBindingSites.leftEndPosition)
        ) {
          _regulatoryBindingSite_position =
            ri.regulatoryBindingSites.leftEndPosition +
            " - " +
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
        _regulatoryBindingSite_position: _regulatoryBindingSite_position,
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

function RegulatoryInteractions({ regulatoryInteractions, allCitations }) {
  console.log(regulatoryInteractions);
  const data = useMemo(() => {
    return formatData(regulatoryInteractions, allCitations);
  }, [regulatoryInteractions, allCitations]);
  return <FilterTable data={data} columns={COLUMNS} />;
}

export default RegulatoryInteractions;
