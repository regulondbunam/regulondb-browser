import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { ValidateID } from "./webServices/operon_ws";
import { ValidateID as TUvalidateID } from "./webServices/tu_ws"
import Title from './components/operon_title'
import Home from "./operon_home"
import Info from "./operon_info"
import conf from './conf/operon.conf.json'

const Operon = () => {
    const [_data, set_data] = useState();
    const [_validId, set_validId] = useState();
    const [_state, set_state] = useState();
    const [_testId, set_testId] = useState();
    const [_operonId, set_operonId] = useState();
    const [_tuId, set_tuId] = useState();

    const id = useParams().id;
    let title = conf?.pages?.operon_main.title;

    useEffect(() => {
        if (!_testId) {
            let operonER = /RDBECOLIOP/gm
            let tuER = /RDBECOLITU/gm
            if (operonER.test(id)) {
                set_testId("operon")
                set_operonId(id)
            } else {
                if (tuER.test(id)) {
                    set_testId("tu")
                    set_tuId(id)
                } else {
                    set_testId("nan")
                }
            }

        }
    }, [id, _testId])
    if(!id){
        return <Home title={title} conf={conf?.pages?.operon_main} />
    }
    if (_data) {
        if(!_validId){
            title = `Sorry we couldn't find the identifier: ${id}`
            return <Title title={title} state="error" />
        }
        //console.log(_data)
        let nTUs = _data[0]?.transcriptionUnits
        title = _data[0]?.operon?.name;
        let showTabs = true
        return (
            <div>
                <Title title={title} data={_data} />
                <Info id={_operonId} 
                    tuId={_tuId} 
                    nTUs={nTUs.length} 
                    showTabs={showTabs}
                />
            </div>
        )
    }
    if (_testId) {
        if (_testId === "nan") {
            title = `Sorry we couldn't find the identifier: ${id}`
            return <Title title={title} state="error" />
        }
        if(_operonId){
            return (
                <div>
                    {
                        _state === "loading"
                            ? <Title title={title} state="loading" />
                            : ""
                    }
                    {
                        _state === "error"
                            ? <Title title={title} state="error" />
                            : ""
                    }
                    <ValidateID id={_operonId}
                        resoultsData={(data) => { set_data(data) }}
                        status={(state) => { set_state(state) }}
                        isValidate={(isGood) => { set_validId(isGood) }}
                    />
                </div>
            )
        }
        if(_tuId){
            return (
                <div>
                    {
                        _state === "loading"
                            ? <Title title={title} state="loading" />
                            : ""
                    }
                    {
                        _state === "error"
                            ? <Title title={title} state="error" />
                            : ""
                    }
                    <TUredirect id={id} 
                        operonId={(operonId)=>{set_operonId(operonId)}}
                        status={(state)=>{set_state(state)}}
                    />
                </div>
            )
        }
    }
    return <></>

}

export default Operon

function TUredirect({ id, operonId, status }) {
    const [_data, set_data] = useState();
    const [_state, set_state] = useState();

    useEffect(() => {
        if (_state === "done") {
            operonId(_data)
            status(_state)
        }
        if(_state === "loading" || _state === "error"){
            status(_state)
        }
    })

    if (_state === "done") {
        return <></>
    }
    if (_state === "error") {
        return <></>
    }

    return <TUvalidateID id_tu={id} status={(state) => { set_state(state) }} resoultsData={(data) => { set_data(data) }} />
}