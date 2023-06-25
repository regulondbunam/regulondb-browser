import { useParams } from 'react-router-dom';
import Tabs from "./tabs";
import Help from "./Help";
import { useState } from "react";
import { Cover } from "../../components/ui-components"

function Coexpression() {

    let { genesId } = useParams();
    let selectedGenes = []
    if(genesId){
        const searchParams = new URLSearchParams(genesId);
        selectedGenes = searchParams.getAll("geneId")
    }
    const [state, setState] = useState('done');

    return (
        <div>
            <Cover state={state} >
                <h1>Gene coexpression</h1>
            </Cover>
            <Help></Help>
            <Tabs selectedGenes={selectedGenes} setState={setState}></Tabs>

        </div>
    );
}

export default Coexpression;

