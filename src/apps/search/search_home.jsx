import React from "react";
import { Cover } from "../../components/ui-components/ui_components";
import SearchBox from "./tools/search_box";
const SearchHome = ( {conf}) => {
  return (
    <>
      <Cover id="searchApp" state="">
        <h1>{conf?.title}</h1>
        <SearchBox />
      </Cover>
      <article>
        <div style={{ padding: "2% 0 2% 0" }}>
          <p dangerouslySetInnerHTML={{__html: conf?.description}} />
        </div>
      </article>
    </>
  );
};

export default SearchHome;
