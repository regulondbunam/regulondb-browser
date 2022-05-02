import React, {useState} from 'react'
import SigmulonTitle from './components/sigmulon_title';
import { useParams, Link } from 'react-router-dom'
import { SpinnerCircle } from '../../components/ui-components/ui_components';
import GetAllSigmulon from './webServices/getAllSigmulons';

export default function Sigmulon() {
    const sigmulonId = useParams().id;
    const site = useParams().site;
    const [_sate, set_sate] = useState()
    const [_data, set_data] = useState()
    //const section = useParams().section;
    if(!sigmulonId){
        if (!_data) {
            return(
                <div>
                    <SigmulonTitle />
                    <GetAllSigmulon resoultsData={(data)=>{set_data(data)}} status={(state)=>{set_sate(state)}} />
                    <SpinnerCircle/>
                </div>
            )
        }
        console.log(_data);
        return (
            <div>
                <SigmulonTitle />
                <article>
                    {
                        _data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Link to={`/sigmulon/${item._id}`} >
                                    {`${item.sigmaFactor.gene.name} Sigmulon ${item.sigmaFactor.name}`}
                                </Link>
                                </div>
                            )
                        })
                    }
                </article>
            </div>
        )

    }
    return (
        <div>
            <SigmulonTitle />
        <div>Sigmulon</div>
        </div>
    )
}
