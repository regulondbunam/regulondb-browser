import React from 'react'
import { Cover, DataVerifier } from "../../components/ui-components";
import { useGetFieldsObject } from '../../regulondb-ws/introspection';

export default function GeneOntology() {
    const query = useGetFieldsObject("McoTree")
  return (
    <div>
        <Cover>
            <h1>Gene Ontology Browser</h1>
        </Cover>
    </div>
  )
}
