import React from 'react';

const styleTitle = {
    backgroundColor: "var(--color-grey5)",
    padding: "2% 10% 2% 10%"
}

export default function Title(geneName, geneID, products) {
    return (
        <div style={styleTitle}>
            <h1 style={{ color: "var(--color-accentB)", margin: "0", float: "left" }}>Gene &nbsp;</h1>
            <h1 style={{ margin: "0", float: "left" }}>{geneName}&nbsp;&nbsp;&nbsp;</h1>
            <h1 style={{ margin: "0" }}
            dangerouslySetInnerHTML={{__html: products.map((product)=>{
                return   `${product.name} `
            })}}>
                
            </h1>
            <h3 style={{ margin: "0", fontSize: "9px" }}>{geneID}</h3>
        </div>
    )


}