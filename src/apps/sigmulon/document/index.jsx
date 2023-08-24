import { useMemo } from "react";
import { AnchorNav, DataVerifier } from "../../../components/ui-components";
import { AllCitations } from "../../../components/datamartSchema";
import Genes from "./components/genes";
import Regulators from "../../../components/datamartSchema/gene/regulation/regulators";
import TranscribedPromoters from "./components/promoters";

const cardOptions = {
  showTitle: true,
};

export default function Document({ sigmulonData }) {
  console.log(sigmulonData);
  /*
  let statistics = <></>;
  if (DataVerifier.isValidObject(sigmulonData.statistics)) {
    statistics = (
      <div style={{ display: "flex", width: "100%", justifyContent: 'space-evenly' }}>
        
      </div>
    );
  }*/
  const sections = useMemo(() => {
    let _sections = [];
    const { allCitations, sigmaFactor, transcribedPromoters, _id } =
      sigmulonData;
    if (DataVerifier.isValidArray(sigmaFactor.sigmulonGenes)) {
      _sections.push({
        id: "SigmaSection_01",
        label: "Genes",
        title: "Sigmulon Genes",
        component: (
          <div style={{ overflow: "auto" }}>
            <Genes genes={sigmaFactor.sigmulonGenes} sigmulonId={_id} />
          </div>
        ),
      });
    }
    if (DataVerifier.isValidArray(sigmaFactor.sigmulonGenes)) {
      _sections.push({
        id: "SigmaSection_02",
        label: "Regulators",
        title: "Sigmulon Regulators",
        component: (
          <div style={{ overflow: "auto" }}>
            <Regulators
              regulators={sigmaFactor.sigmulonRegulators}
              variant="filterTable"
              sigmulonId={_id}
            />
          </div>
        ),
      });
    }
    if (DataVerifier.isValidArray(transcribedPromoters)) {
      _sections.push({
        id: "SigmaSection_03",
        label: "Promoters",
        title: "Transcribed Promoters",
        component: (
          <div style={{ overflow: "auto" }}>
            <TranscribedPromoters
              promoters={transcribedPromoters}
              sigmulonId={_id}
            />
          </div>
        ),
      });
    }
    if (DataVerifier.isValidArray(allCitations)) {
      _sections.push({
        id: "sigmaSections_allCitations",
        label: "Citations",
        title: "Citations",
        component: (
          <div style={{ overflow: "auto" }}>
            <AllCitations allCitations={allCitations} />
          </div>
        ),
      });
    }
    return _sections;
  }, [sigmulonData]);
  return (
    <div>
      <AnchorNav
        sections={sections}
        cardOptions={cardOptions}
        title={`Sigmulon ${sigmulonData.sigmaFactor.name}`}
      />
    </div>
  );
}
