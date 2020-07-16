import React, { useState } from 'react';
import ToolTip from '../ui-components/infoDisplay/toolTip/ToolTip'
import {IconButton} from '../ui-components/basicInput/Buttons'
import Style from './Phrase.module.css'

const Phrase = ({
    term,
    style,
    phraseData
}) => {
    const [visible, setVisible] = useState(false)
    const [idphrase, setidPhrase] = useState(0)
    const [ancla, setAncla] = useState(false)
    //console.log(phraseData)

    const TipPhrase = () => {
        if(phraseData === undefined){
            return <></>
        }
        //console.log(phraseData)
        const phrase = phraseData.phrases[idphrase]
        const nPhrases = phraseData.phrases.length
        let pagControl = <></>
        if(nPhrases>1){
            let arrwStyleL = {}
            let arrwStyleR = {}
            console.log(nPhrases,"-",idphrase)
            if(nPhrases-1 === idphrase){arrwStyleR = {display: 'none'}}
            if(idphrase === 0){arrwStyleL = {display: 'none'}}
            pagControl = <> <IconButton onClick={()=>{setidPhrase(idphrase-1)}} style={arrwStyleL} icon="keyboard_arrow_left" className={Style.phraseIconButton}/>
                            <IconButton onClick={()=>{setidPhrase(idphrase+1)}} style={arrwStyleR} icon='keyboard_arrow_right' className={Style.phraseIconButton}/>
                        </>
        }
        let pinStyle = {}
        if(ancla){
            pinStyle = {color: "#000000",backgroundColor:"#CC9900"}
        }
        return(
            <div className={Style.phraseTip} onMouseLeave={()=>{if(!ancla){setVisible(false)}}}>
                <div className={Style.phraseHeader}>
                    <div style={{width: '60%'}}>
                    <b>{phraseData.name}</b>
                    </div>
                    <div className="phraseTipControl">
                        <IconButton  icon='help' className={Style.phraseIconButton} />
                        <IconButton onClick={()=>{setAncla(!ancla)}} style={pinStyle}  icon='push_pin' className={Style.phraseIconButton}/>
                        <IconButton onClick={()=>{setVisible(false)}} icon='clear' className={Style.phraseIconButton}/>
                    </div>
                </div>
                <div className="phraseBody">
                    <p>{phrase.phrase}</p>
                </div>
                <div className="phraseFooter">
                    {pagControl}
                </div>
            </div>
        )
    }



    return (
        <ToolTip style={style} Tip={TipPhrase} autoShow={false} display={visible}>
            <div style={{cursor:'help'}} 
            onContextMenu={(e)=>{e.preventDefault();setVisible(!visible)}}
            >
            {term}
            </div>
        </ToolTip>
    )

}

export default Phrase;