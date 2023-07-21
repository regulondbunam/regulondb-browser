
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { DataVerifier } from "../../../components/ui-components"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
//import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const PagesResults = (geneData, limit = 10) => {
  let _results = []
  if (DataVerifier.isValidArray(geneData)) {
    let _page = []
    let count = 1
    geneData.forEach((gene) => {
      _page.push({ name: gene.gene.name, _id: gene._id })
      if (limit === count) {
        _results.push(_page)
        _page = []
        count = 1
      } else {
        count++
      }
    });
    _results.push(_page)
  }
  return _results
}

function Gene({ error, loading, geneData, limit = 10 }) {

  const [page, setPage] = useState(0);
  let navigate = useNavigate();

  let results = PagesResults(geneData, limit)

  return (
    <div>
      <h2>{`Genes (${geneData.length})`}</h2>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Box>
      )}
      {DataVerifier.isValidArray(results) && (
        <List dense >
          {results[page].map(gene => {
            return (
              <ListItemButton key={"gene_result_" + gene._id}
                onClick={()=>{navigate("/gene/" + gene._id);}}
              >
                <ListItemText primary={gene.name} />
              </ListItemButton>
            )
          })}
          <ListItem>
            <div style={{backgroundColor: "#DDDDDD", width: "100%", height: "30px", display: "flex", flexDirection: "row-reverse"}} >
              {geneData.length>limit && (
                <ButtonGroup size="small">
                <Button
                  onClick={()=>{
                    if (page > 0) {
                      setPage(page-1)
                    }
                  }}
                >{"<- PrevPage"}</Button>
                <Button>{page+1}</Button>
                <Button
                  onClick={()=>{
                    if (page < results.length-1) {
                      setPage(page+1)
                    }
                  }}
                >{"NextPage ->"}</Button>
              </ButtonGroup>
              )}
            </div>
          </ListItem>
        </List>
      )}
    </div>
  )
}


export default Gene;
