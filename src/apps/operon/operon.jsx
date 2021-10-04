import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { ValidateID } from "./webServices/operon_ws";
import { ValidateID as TUvalidateID } from "./webServices/tu_ws"
import { CitationsProvider } from '../../components/citations/citations_provider'
import Title from './components/operon_title'
import Home from "./operon_home"
import Info from "./operon_info"
import conf from './conf/operon.conf.json'

export const Operon = () => {
    const id = useParams().id;
    return (
        <>
            <Title />
            {
                id
                    ? <OperonBody id={id} />
                    : <Home conf={conf?.pages?.operon_main} />
            }

        </>
    )
}


const OperonBody = ({ id }) => {

    const [_data, set_data] = useState();
    const [_validId, set_validId] = useState();
    const [_testId, set_testId] = useState();
    const [_operonId, set_operonId] = useState();
    const [_tuId, set_tuId] = useState();
    const [_title, set_title] = useState();
    const [state, setState] = useState();


    useEffect(() => {
        const covera = document.getElementById("div_cover_operon_01")
        if (!_title) {
            if (_data) {
                if (!_validId) {
                    set_title(`Sorry we couldn't find the identifier: ${id}`)
                }
                set_title(_data[0]?.operon?.name)
            } else {
                if (_testId === "nan") {
                    set_title(`Sorry, this ID does not belong to Operon's collection. ${id}`)
                    setState("error")
                }
            }

        }
        if (covera) {
            const coverR = new CustomEvent('coverR', {
                bubbles: true,
                detail: {
                    state: state,
                    title: _title,
                    isInfo: _validId
                }
            });
            covera.dispatchEvent(coverR);
        }
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
    }, [id, _testId, state, _title, _validId, _data])
    if (!id) {
        return <Home conf={conf?.pages?.operon_main} setState={state => { setState(state); set_title(conf.pages.operon_main.title) }} />
    }
    if (_data) {
        if (!_validId) {
            document.getElementById("cover_operon_01").innerHTML = `Sorry we couldn't find the identifier: ${id}`
            return <></>
        }
        //console.log(_data)
        let nTUs = _data[0]?.transcriptionUnits
        return (
            <CitationsProvider allCitations={_data[0]?.allCitations} >
                <Info id={_operonId}
                    tuId={_tuId}
                    nTUs={nTUs.length}
                    data={_data}
                />
            </CitationsProvider>

        )
    }
    if (_testId) {
        if (_testId === "nan") {
            return <></>
        }
        if (_operonId) {
            document.getElementById("cover_operon_01").innerHTML = `Searching for ID[${id}] information `
            return (
                <div>
                    <ValidateID id_operon={_operonId}
                        resoultsData={(data) => { set_data(data) }}
                        status={(state) => { setState(state) }}
                        isValidate={(isGood) => { set_validId(isGood) }}
                    />
                </div>
            )
        }
        if (_tuId) {
            document.getElementById("cover_operon_01").innerHTML = `Searching for ID[${id}] information `
            return (
                <div>
                    <TUredirect id={id}
                        operonId={(operonId) => { set_operonId(operonId) }}
                        status={(state) => { setState(state) }}
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
        if (_state === "loading" || _state === "error") {
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