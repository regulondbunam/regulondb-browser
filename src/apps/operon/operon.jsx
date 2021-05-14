import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from "react-router-dom";
import { ValidateId } from "./webServices/operon_ws_validate";
import { SearchTU } from "./webServices/operon_ws_TU"
import Title from './components/operon_title'
import Home from "./operon_home"
import Info from "./operon_info"
import conf from './conf/operon.conf.json'

const Operon = () => {
    const [_data, set_data] = useState();
    const [_validId, set_validId] = useState();
    const [_state, set_state] = useState();
    const [_testId, set_testId] = useState();
    const id = useParams().id;
    let title = conf?.pages?.operon_main.title;
    useEffect(() => {
        if (!_testId) {
            let operonER = /RDBECOLIOP/gm
            let tuER = /RDBECOLITU/gm
            if (operonER.test(id)) {
                set_testId("operon")
            } else {
                if (tuER.test(id)) {
                    set_testId("tu")
                } else {
                    set_testId("nan")
                }
            }

        }
    }, [id, _testId])
    if (id) {
        if (_testId && _testId !== "nan") {
            if (_state === "done") {
                if (_validId && _data != null) {
                    //console.log(_data)
                    let nTUs = _data[0]?.transcriptionUnits
                    title = _data[0]?.operon?.name;
                    let showTabs = true
                    return (
                        <div>
                            <Title title={title} state={_state} data={_data} />
                            <Info id={id} nTUs={nTUs.length} showTabs={showTabs} />
                        </div>
                    )
                } else {
                    title = `Sorry we couldn't find the identifier: ${id}`
                    return <Title title={title} state="error" />
                }
            }
            if(_testId === "tu"){
                return <TUredirect id={id} />
            }
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
                    <ValidateId id={id}
                        resoultsData={(data) => { set_data(data) }}
                        status={(state) => { set_state(state) }}
                        isValidate={(isGood) => { set_validId(isGood) }}
                    />
                </div>
            )
        }
        if (_testId === "nan") {
            title = `Sorry... id ${id} is not valid.`
            return (
                <div>
                    <Title title={title} state="error" />
                </div>
            )
        }
        title = `Wait...`
        return (
            <div>
                <Title title={title} state="loading" />
            </div>
        )
        /*
        
        
        */
    } else {
        return home_default(title)
    }

}

export default Operon

function home_default(title) {
    return (
        <div>
            <Title title={title} />
            <article>
                <Home conf={conf?.pages?.operon_main} />
            </article>
        </div>
    )
}

function TUredirect({id}){
    const [_data, set_data] = useState();
    const [_state, set_state] = useState();

    if(_state === "done"){
        return <Redirect to={`/operon/${_data}/TU/${id}`} />
    }
    if(_state === "error"){
        return null
    }

    return <SearchTU id={id} status={(state)=>{set_state(state)}} resoultsData={(data)=>{set_data(data)}} />
}