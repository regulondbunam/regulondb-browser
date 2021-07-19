import React from "react";
import Home from "./search_home";
import SearchResult from "./search_result";
import { useParams } from "react-router-dom";
import conf from "./conf/search.conf.json";

const Search = () => {
  const KEY_WORD = useParams().keyword
  if(KEY_WORD){
    return <SearchResult  conf={conf} keyword={KEY_WORD} />;
  }
  return <Home  conf={conf}/>;
};

export default Search;
