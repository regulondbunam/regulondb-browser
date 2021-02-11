import React from "react";
import Description from "../geneDescription/gene_description";
import Products from "../geneProducts/gene_products";

const All = ({ all_citations = [], id_gene, id }) => {
  return (
    <>
      <Description
        id_gene={id_gene}
        id={`tab-description`}
        all_citations={all_citations}
      />
      <Products
        id_gene={id_gene}
        id={`tab-products`}
        all_citations={all_citations}
      />
    </>
  );
};

export default All;
