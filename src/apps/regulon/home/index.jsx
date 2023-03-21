import { useEffect } from 'react';
import ObjectListExplorer  from '../../../components/objectListExplorer';
import { UpdateTitle } from '../Title';


function Home() {

    useEffect(() => {
        UpdateTitle({ title: "Regulon", geneToken: undefined });
    })

    const attributesEnabled=[
        "_id",
        "productsName",
        "encodedGenes",
        "name",
        "synonyms"
    ]

    return (
        <article>
            <ObjectListExplorer attributesEnabled={attributesEnabled} title='Regulon' datamartType={"regulon"} />
        </article>
    );
}

export default Home;