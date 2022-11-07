import React, { Component } from "react";
import { DataCONTEXT } from "../../../components/webservices/DataProvider";
import { UpdateTitle } from "../Title";
import NavigationTabs from "./NavigationTabs";
import SigmaFactor from "./sigmaFactor";
import Promoters from "./promoters";

class Details extends Component {
  createTabs = (sigmaFactor,transcribedPromoters,allCitations) => {
    let tabs = [
        {
            id: "t_01",
            name: "Sigma Factor",
            element: <SigmaFactor sigmaFactor={sigmaFactor} allCitations={allCitations} />,
          },
          {
            id: "t_02",
            name: "Promoters",
            subtitle: "transcribed",
            element: (<Promoters transcribedPromoters={transcribedPromoters} />),
          }
    ];
    return tabs;
  };

  render() {
    const { data } = this.context._data;
    //console.log(data);
    const { _id, statistics, sigmaFactor, allCitations, transcribedPromoters} = data[0];
    //const { promoterId } = this.props;
    UpdateTitle({ sigmulonToken: {_id: _id, sigmaFactor: sigmaFactor, statistics: statistics} });
    const tabs = this.createTabs(sigmaFactor,transcribedPromoters,allCitations);
    //console.log(this.context);
    if (this.error) {
      return "error";
    }
    return (
      <div>
        <NavigationTabs
          tabSelect={"t_01"}
          tabs={tabs}
        />
      </div>
    );
  }
}
Details.contextType = DataCONTEXT;

export default Details;
