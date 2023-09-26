import { Cover } from "./cover";
import { Body } from "./body";
import conf from "./conf/home.conf.json";

const Home = () => {
  return (
    <div>
      <Cover />
      <div className="noAnimate">
        <Body />
        <div>
          <p style={{ color: "white" }}>{conf.version}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

/*

*/
