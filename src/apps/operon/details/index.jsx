import React, { Component } from "react";
import { DataCONTEXT } from "../../../components/webservices/DataProvider";
import { UpdateTitle } from "../Title";
import NavigationTabs from "./NavigationTabs";
import OperonDtt from "./operon";

class Details extends Component {
  createTabs = (_id, relatedIds, operon, transcriptionUnits) => {
    let tabs = [];
    tabs.push({
      id: _id,
      type: "summary",
      tus: transcriptionUnits,
      operon: operon,
      element: (
        <div>
          <div style={{ marginLeft: "10%" }}>
            <h2>Operon General Context</h2>
          </div>
          <OperonDtt
            id={`dttOperon_main_${_id}`}
            relatedIds={relatedIds}
            operon={operon}
          />
        </div>
      ),
    });
    if (transcriptionUnits.length > 0) {
      transcriptionUnits.forEach((tu) => {
        tabs.push({
          id: tu.id,
          type:"tu",
          operon: operon,
          tu:tu
        });
      });
    }
    return tabs;
  };

  createTabsInfo = (_id, transcriptionUnits) => {
    let tabsInfo = [
      {
        id: _id,
        name: "Summary",
        type: "operon",
      },
    ];
    if (transcriptionUnits.length > 0) {
      transcriptionUnits.forEach((tu) => {
        tabsInfo.push({
          id: tu.id,
          name: `${tu.name}`,
          type: "tu",
        });
      });
    }
    return tabsInfo;
  };

  render() {
    const { data, relatedIds } = this.context._data;
    //console.log(this.context);
    const { _id, operon, transcriptionUnits = [], allCitations } = data[0];
    const { id_selected = _id } = this.props;
    UpdateTitle({ operonToken: operon });
    const tabs = this.createTabs(_id, relatedIds, operon, transcriptionUnits);
    const tabsInfo = this.createTabsInfo(_id, transcriptionUnits);
    //console.log(this.context);
    if (this.error) {
      return "error";
    }
    return (
      <div>
        <NavigationTabs
          tabsInfo={tabsInfo}
          tabSelect={id_selected}
          tabs={tabs}
          allCitations={allCitations}
        />
      </div>
    );
  }
}
Details.contextType = DataCONTEXT;

export default Details;
