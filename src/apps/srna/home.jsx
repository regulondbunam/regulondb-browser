import {Title} from './components/title';
import { ObjectListExplorer } from '../../components/ui-components';

export default function Home() {

    const attributesEnabled=[
        "_id",
        "encodedGenes",
        "name",
        "synonyms"
    ]
    
    return(
        <div>
            <Title title={"SRNA"} />
            <br/>
            <article>
                <ObjectListExplorer attributesEnabled={attributesEnabled} title='SRNA' datamartType={"srna"} />
            </article>
            
        </div>
    )
}