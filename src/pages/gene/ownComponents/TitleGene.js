import React from 'react';

const styleTitle = {
    backgroundColor: "var(--color-grey5)",
    padding: "2% 10% 2% 10%"
}

export default function Title(geneName, geneID, products) {
    const propd = products.map((product)=>{
        return   `${product.name} `
    })
    return (
        <div style={styleTitle}>
            Gene
            <br/>
            <h1 style={{ margin: "0", float: "left"}}
            dangerouslySetInnerHTML={{__html: `${geneName} ${propd}`}}>
            </h1>
            <br/>
        </div>
    )


}