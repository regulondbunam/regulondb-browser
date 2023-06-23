function Products({ products }) {
    return (
        <div>
            <h2>Products</h2>
            <div style={{margin: "0 0 5px 5%"}} >
                {products.map(product => {
                    return <div key={"tfProduct_" + product._id} ><p className='p_accent'>{product.name}</p></div>
                })}
            </div>
        </div>
    );
}

export default Products;