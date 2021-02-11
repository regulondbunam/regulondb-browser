import React from "react";
import { Fragment } from "react";
import { TableProductInfo } from "./gene_productInfo";
//import TableProductExternalID from './productsTab/TableProductExternalID'
import { GeneProducts } from "../../webServices/GeneQuerys";
import { useQuery } from "@apollo/react-hooks";

const GeneProduct = ({ all_citations = [], id_gene, id }) => {
  const productsS = new GeneProducts(id_gene);
  const advancedSearch = productsS.advancedSearch;
  const { data, loading, error } = useQuery(productsS.query, {
    variables: { advancedSearch }
  });
  //console.log(data)
  //console.log(error)
  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Server error </>;
  }
  try {
    const products = data.getGenesBy.data[0].products;
    return (
      <article>
        <h2>Product information</h2>
        {products.map((product) => {
          return (
            <Fragment key={product.name}>
              <h3
                dangerouslySetInnerHTML={{ __html: product.name }}
                style={{ margin: "0" }}
              />
              {TableProductInfo(product, all_citations)}
            </Fragment>
          );
        })}
      </article>
    );
  } catch (error) {
    console.log(error);
    return <></>;
  }
};

export default GeneProduct;
