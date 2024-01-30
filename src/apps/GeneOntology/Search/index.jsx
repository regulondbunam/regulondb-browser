import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useLazyGetGOBySearch } from "../../../regulondb-ws/queries";
import { Circular, DataVerifier } from "../../../components/ui-components";
import Result from "./Result";
//import DeleteIcon from "@mui/icons-material/Delete";

export default function Search({ setSelectedIdGO, keyword: _keyword }) {
  const [searchGOTermBy, { goTerms, loading }] = useLazyGetGOBySearch();
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    const inputSearch = document.getElementById("inputSearch");
    if (inputSearch && _keyword && !keyword && !goTerms) {
      inputSearch.value = _keyword;
      setKeyword(inputSearch.value);
      searchGOTermBy(_keyword);
    }
    if (DataVerifier.isValidArray(goTerms)) {
      if (goTerms.length === 1) {
        setTimeout(() => {
          setSelectedIdGO(goTerms[0]._id);
        }, 100);
      }
    }
  }, [_keyword, keyword, goTerms, searchGOTermBy, setSelectedIdGO]);

  const handleSetId = (idGO) => {
    setSelectedIdGO(undefined);
    setTimeout(() => {
      setSelectedIdGO(idGO);
    }, 100);
  };

  const handleSearch = () => {
    const inputSearch = document.getElementById("inputSearch");
    if (inputSearch) {
      setKeyword(inputSearch.value);
      searchGOTermBy(inputSearch.value);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleDeleteSearch = () => {
    setSelectedIdGO(undefined);
    const inputSearch = document.getElementById("inputSearch");
    if (inputSearch) {
      inputSearch.value = "";
      setKeyword(undefined);
      setSelectedIdGO(undefined)
    }
  };

  return (
    <div>
      <div style={{ display: "flex", margin: "0 0 0 5%" }}>
        <TextField
          size="small"
          id="inputSearch"
          label="Search"
          variant="outlined"
          sx={{ width: "20%" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Button onClick={handleSearch} variant="contained" sx={{ mr: 1 }}>
              Search
            </Button>
          </div>
          {keyword && (
            <div>
              { /*keyword && (
                <Button
                  color="error"
                  onClick={handleDeleteSearch}
                  variant="contained"
                >
                  Clean Results
                  <DeleteIcon />
                </Button>
              )*/}
            </div>
          )}
        </div>
      </div>
      <br />
      <div>
        {loading && <Circular />}
        {keyword && (
          <GOResult
            goTerms={goTerms}
            keyword={keyword}
            handleSetId={handleSetId}
          />
        )}
      </div>
    </div>
  );
}

function GOResult({ keyword, goTerms, handleSetId = () => {} }) {
  const [view, setView] = useState(true);

  const handleViewResults = () => {
    setView(!view);
  };

  if (goTerms === null) {
    return (
      <div style={{ marginLeft: "5%" }}>
        <p>
          <b>{`No results found with "${keyword}"`}</b>
        </p>
      </div>
    );
  }

  if (DataVerifier.isValidArray(goTerms)) {
    return (
      <div style={{ margin: "0 10% 0 10%" }}>
        {goTerms.length > 1 && (
          <Button size="small" onClick={handleViewResults} variant="outlined">
            {view ? "Hide " : "Show "}
            {`search results for "${keyword}" (${goTerms.length})`}
          </Button>
        )}
        {view && goTerms.length > 1 && (
          <>
            {goTerms.map((term) => {
              return (
                <div
                  style={{ marginBottom: "15px" }}
                  key={"resultSearchTerm_" + term._id}
                >
                  <Result handleViewResults={handleViewResults} handleSetId={handleSetId} {...term} />
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
  return <></>;
}

/*

*/
