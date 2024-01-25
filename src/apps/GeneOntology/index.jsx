import React, { useState } from 'react'
import { Cover, Circular } from "../../components/ui-components";
import { useGetGoTerms } from '../../regulondb-ws/queries';
import GoTree from './GOTree';
import Search from './Search';
import { useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';


export default function GeneOntology() {
    const {treeGO, loading, /*error*/} = useGetGoTerms()
    const { keyword }= useParams()
    const [selectedIdGO, setSelectedIdGO] = useState()

  return (
    <div>
        <Cover state={loading ? "loading" : "done"} >
            <h1>Gene Ontology Browser</h1>
        </Cover>
        <Search setSelectedIdGO={setSelectedIdGO} inKeyword={keyword} />
        {loading && <Circular/>}
        <Divider />
        {treeGO && <GoTree treeGO={treeGO} selectedIdGO={selectedIdGO} />}
    </div>
  )
}
