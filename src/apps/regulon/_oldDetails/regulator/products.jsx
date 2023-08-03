function Products({ products }) {
    return (
        <div>
            <p><b>Products:</b></p>
            <div style={{marginLeft: "1%"}} >
                {products.map(product => {
                    return <p>{product.name}</p>
                })}
            </div>
        </div>
    );
}

export default Products;