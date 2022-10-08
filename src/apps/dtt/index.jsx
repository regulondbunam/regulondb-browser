import { Tabs } from "./tabs/tabs";
import UserData from "./user_data";
import RDBdata from "./rdb_data";
import DDTE from "./embed";
import Title from "./title";

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
      <Title title={"Drawing Traces Tool"} />
      <Tabs tabSelect={"01"} tabsInfo={tabsInfo} tabs={tabs} />
    </div>
  );
}

export default DrawingTracesInterface;
