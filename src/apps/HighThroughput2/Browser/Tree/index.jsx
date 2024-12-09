import React from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import useGetInitTree from '../../WebServices/useGetTree';


export default function TreeView({
  updateDataset
}) {

  const handleSelectItem = (event, itemId) => {
    const info = itemId.split("&");
    let properties = {};
    for (const property of info) {
      const values = property.split(":")
      properties[values[0]] = values[1]
    }
    updateDataset(properties?.datasetType,properties?.source,properties?.experimentType)
  }
    
    return (
      <Box sx={{ minHeight: 352, minWidth: 250 }}>
        <RichTreeView 
          items={useGetInitTree()}
          onItemClick={handleSelectItem}
          />
      </Box>
    );
  }