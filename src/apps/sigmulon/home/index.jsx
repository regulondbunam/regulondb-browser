import { useEffect } from 'react';
import ObjectListExplorer from '../../../components/objectListExplorer';
import { UpdateTitle } from '../Title';


function Home() {

    useEffect(() => {
        UpdateTitle({ title: "Sigmulon", geneToken: undefined });
    })

    const attributesEnabled=[
        "_id",
        "productsName",
        "encodedGenes",
        "sigmulonGeneName",
        "name",
        "synonyms"
    ]

    return (
        <article>
            <ObjectListExplorer attributesEnabled={attributesEnabled} title='Sigmulon' datamartType={"sigmulon"} />
        </article>
    );
}

export default Home;