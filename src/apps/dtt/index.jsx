import { Tabs } from "./tabs/tabs";
import UserData from "./user_data";
import RDBdata from "./rdb_data";
import DDTE from "./embed";
import {Cover} from "../../components/ui-components"

const tabsInfo = [
  { id: "01", name: "RegulonDB-Data", disabled: false },
  { id: "02", name: "User Data", disabled: false },
];

const tabs = [
  <div id="01">
    <RDBdata />
  </div>,
  <div id="02">
      <UserData></UserData>
  </div>,
];

function DrawingTracesInterface({ params, embed }) {
    if (embed) {
        return <DDTE params={params} />
    }
  return (
    <div>
      <Cover>
        <br />
        <h1 style={{ marginBottom: "0px"}} >Drawing Traces Tool</h1>
        <br />
      </Cover>
      <Tabs tabSelect={"01"} tabsInfo={tabsInfo} tabs={tabs} />
    </div>
  );
}

export default DrawingTracesInterface;
