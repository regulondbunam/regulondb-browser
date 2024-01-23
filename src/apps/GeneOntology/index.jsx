import React, { useState } from 'react'
import { Cover, Circular } from "../../components/ui-components";
import { useGetGoTerms } from '../../regulondb-ws/queries';
import GoTree from './GOTree';
import Search from './Search';
import { useParams } from 'react-router-dom';

export default function GeneOntology() {
    const {treeGO, loading, error} = useGetGoTerms()
    const { goId }= useParams()
    const [selectedIdGO, setSelectedIdGO] = useState(goId)
  return (
    <div>
        <Cover state={loading ? "loading" : "done"} >
            <h1>Gene Ontology Browser</h1>
        </Cover>
        <Search setSelectedIdGO={setSelectedIdGO} />
        {loading && <Circular/>}
        {treeGO && <GoTree treeGO={treeGO} />}
    </div>
  )
}
