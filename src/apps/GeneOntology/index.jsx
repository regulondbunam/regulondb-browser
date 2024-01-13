import React from 'react'
import { Cover, Circular } from "../../components/ui-components";
import { useGetGoTerms } from '../../regulondb-ws/queries';
import GoTree from './GOTree';

export default function GeneOntology() {
    const {goTerms, loading, error} = useGetGoTerms()
    console.log(goTerms);
  return (
    <div>
        <Cover state={loading ? "loading" : "done"} >
            <h1>Gene Ontology Browser</h1>
        </Cover>
        {loading && <Circular/>}
        {goTerms && <GoTree goTerms={goTerms} />}
        
    </div>
  )
}
