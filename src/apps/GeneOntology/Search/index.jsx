import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useGetGOBySearch } from "../../../regulondb-ws/queries";
import {
  Circular,
  DataVerifier,
} from "../../../components/ui-components";
import Result from "./Result";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Search({ setSelectedIdGO, inKeyword }) {
  const [keyword, setKeyword] = useState(inKeyword);

  const handleSearch = () => {
    let inputText = document.getElementById("inputSearch");
    if (inputText) {
      setTimeout(() => {
        setKeyword(inputText.value);
      }, 100);
    }
  };

  const handleDeleteSearch = () => {
    setKeyword("");
  };

  useEffect(() => {
    const inputSearch = document.getElementById("inputSearch")
    if(inputSearch){
      inputSearch.value = keyword
    }
  }, [keyword])
  

  return (
    <div>
      <div style={{ display: "flex", margin: "0 0 0 5%" }}>
        <TextField
          size="small"
          id="inputSearch"
          label="Search"
          variant="outlined"
          sx={{ width: "20%" }}
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
          <div>
            {keyword && (
              <Button
                color="error"
                onClick={handleDeleteSearch}
                variant="contained"
              >
                Delete Results
                <DeleteIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
      <br />
      <div>
        {keyword && (
          <GOResult setSelectedIdGO={setSelectedIdGO} keyword={keyword} />
        )}
      </div>
    </div>
  );
}

function GOResult({ keyword, setSelectedIdGO = () => {} }) {
  const { goTerms, loading, error } = useGetGOBySearch(`"${keyword}"`);
  const [view, setView] = useState(true);

  const handleSelectIdGO = (id) => {
    setView(false);
    setSelectedIdGO(id);
  };

  const handleViewResults = () => {
    setView(!view);
  };

  useEffect(() => {
    if (goTerms && !error) {
      if (goTerms.length === 1) {
        setView(false);
        setSelectedIdGO(goTerms[0]._id);
      }
    }
  }, [goTerms, error, setSelectedIdGO, setView]);

  if (!DataVerifier.isValidArray(goTerms) && !loading) {
    return (
      <div>
        <p>
          <b>{`No results found with ${keyword}`}</b>
        </p>
      </div>
    );
  }

  if (DataVerifier.isValidArray(goTerms)) {
    return (
      <div style={{ margin: "0 10% 0 10%" }}>
        {goTerms.length > 1 &&(
          <Button size="small" onClick={handleViewResults} variant="outlined">
          {view ? "Hide " : "Show "}
          {`search results for "${keyword}" (${goTerms.length})`}
        </Button>
        )}
        {view && (
          <>
            {goTerms.map((term) => {
              return (
                <div
                  style={{ marginBottom: "15px" }}
                  key={"resultSearchTerm_" + term._id}
                >
                  <Result handleSelectIdGO={handleSelectIdGO} {...term} />
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
  if (loading) {
    return <Circular />;
  }
  return <></>;
}
