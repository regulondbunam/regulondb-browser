import { useEffect } from 'react';
import { ObjectListExplorer } from '../../../components/ui-components';
import { UpdateTitle } from '../Title';


function Home() {

    useEffect(() => {
        UpdateTitle({ title: "Operon", geneToken: undefined });
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
            <ObjectListExplorer attributesEnabled={attributesEnabled} title='Operon' datamartType={"operon"} />
        </article>
    );
}

export default Home;