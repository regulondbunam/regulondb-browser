import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useGetGOBySearch } from "../../../regulondb-ws/queries";
import { Accordion, Circular } from "../../../components/ui-components";
import OntologyData from "../OntologyData";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Search({setSelectedIdGO}) {
  const [keyword, setKeyword] = useState()

const handleSearch = ()=>{
  setKeyword(undefined)
  let inputText = document.getElementById("inputSearch")
  if (inputText) {
    setTimeout(() => {
      setKeyword(inputText.value)
    }, 100);
  }
}

const handleDeleteSearch = ()=>{
  setKeyword(undefined)
}
  return (
    <div>
      <div style={{display: "flex", margin: "0 0 0 5%"}} >
      <TextField id="inputSearch" label="Search" variant="outlined" sx={{width: "20%"}} />
        <Button onClick={handleSearch} variant="contained" >Search</Button>
        {keyword && <Button color="error" onClick={handleDeleteSearch} variant="contained" ><DeleteIcon /></Button>}
      </div>
      <br />
      {keyword && <GOResult keyword={keyword} />}
    </div>
  );
}

function GOResult({keyword}) {
  const {goTerms, loading, error} = useGetGOBySearch(keyword)
  if (goTerms) {
    return(
      <div style={{margin: "0 10% 0 10%"}} >
        {goTerms.map((term)=>{
          return(
            <div style={{marginBottom: "15px"}} key={"resultSearchTerm_"+term._id} >
              <Accordion title={<h4>{term.name}</h4>} expand={false} >
                <OntologyData {...term} />
              </Accordion>
            </div>
            )
        })}
      </div>
    )
  }
  if (loading) {
    return <Circular />
  }
  return <></>
}
