import React, {useState, useEffect} from 'react'
import GetRegulates from '../webServices/regulon/regulates'
import RegulatoryNetwork from '../../../components/regulatoryNetwork/RegulatoryNetwork'
import { Genes } from './regulon/genes'
import { Operons } from './regulon/operon'
import Terms from './regulon_terms'
import { SigmaFactors } from './regulon/sigmaFactors'
import { TranscriptionUnits } from './regulon/transcriptionUnits'
import { SpinnerCircle } from '../components/ui-components_old/ui_components'

export default function Regulon({id_regulon, conf}) {

    const [_data, set_data] = useState()
    const [_state, set_state] = useState()

    useEffect(() => {
        const COVER = document.getElementById("div_cover_regulon_01")
        if(COVER){
            const COVER_REACTION = new CustomEvent('coverR',{
                bubbles: true,
                detail: { 
                    state: _state,
                }
            });
            COVER.dispatchEvent(COVER_REACTION);
        }
    }, [_state])

    if(_data){
        return(
            <article>
                <h2>Regulates</h2>
                <RegulatoryNetwork id_regulon={id_regulon} />
                <Genes genes={_data?.genes} />
                <Operons operons={_data?.operons} />
                <TranscriptionUnits transcriptionUnits={_data?.transcriptionUnits} />
                <SigmaFactors sigmaFactors={_data?.sigmaFactors} />
                <Terms id_regulon={id_regulon} />
            </article>
        )
    }


    return (
        <div>
            <br />
            <br />
            loading..
            <SpinnerCircle />
            <GetRegulates id_regulon={id_regulon} status={(state)=>{set_state(state)}} resoultsData={(data)=>{set_data(data)}} />
        </div>
    )
}
