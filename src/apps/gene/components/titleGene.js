import React from 'react';
import {Cover} from '../../../components/ui-components/index'

export default function Title(geneName, geneID, products) {
    const propd = products.map((product)=>{
        return   `${product.name} `
    })
    return (
        <Cover>
            <br/>
            Gene
            <br/>
            <h1 assistentvalue={`${geneName} gene page...`} style={{ margin: "0"}} className={'h1-cover'}
            dangerouslySetInnerHTML={{__html: `${geneName} ${propd}`}}>
            </h1>
            <br/>
        </Cover>
    )


}