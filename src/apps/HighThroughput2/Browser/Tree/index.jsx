import React from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import useGetInitTree from '../../WebServices/useGetTree';
import { useTreeViewApiRef } from '@mui/x-tree-view/hooks/useTreeViewApiRef';

export default function TreeView() {
    const apiRef = useTreeViewApiRef();

  const handleSetFocusTree = (event) => {
    apiRef.current?.focusItem(event, 'pickers');
  };
    return (
      <Box sx={{ minHeight: 352, minWidth: 250 }}>
        <RichTreeView items={useGetInitTree()} />
      </Box>
    );
  }