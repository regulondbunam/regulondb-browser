import ObjectListExplorer  from '../../../components/objectListExplorer';


function Home() {


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