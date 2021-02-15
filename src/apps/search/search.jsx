import React from "react";
import { withRouter } from "react-router-dom";
import Home from "./search_home";
import SearchResult from "./search_result";
import conf from "./conf/search.conf.json";

const Search = ({ aside, location }) => {
  const search = () => {
    return location.pathname.slice(8);
  };
  if (search().length > 0) {
    return <SearchResult  conf={conf} keyword={search()} />;
  }
  return <Home  conf={conf}/>;
};

export default withRouter(Search);
