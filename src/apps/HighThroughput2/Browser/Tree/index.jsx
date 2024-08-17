import React from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import useGetInitTree from '../../WebServices/useGetTree';
/*import { useTreeViewApiRef } from '@mui/x-tree-view/hooks/useTreeViewApiRef';
const apiRef = useTreeViewApiRef();

  const handleSetFocusTree = (event) => {
    apiRef.current?.focusItem(event, 'pickers');
  };*/


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