import React from "react";
import { withRouter } from "react-router-dom";
import Home from "./search_home";
import SearchResult from "./search_result";

const Search = ({ aside, location }) => {
  const search = () => {
    return location.pathname.slice(8);
  };
  if (search().length > 0) {
    return <SearchResult keyword={search()} />;
  }
  return <Home />;
};

export default withRouter(Search);
