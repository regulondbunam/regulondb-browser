import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title, { UpdateTitle } from "./Title";
import Home from "./home";
import Details from "./details";
import WebServices from "../../components/webservices/WebServices";

function Regulon() {
    const [_regulonData, set_regulonData] = useState();
    let { regulonId } = useParams();

    useEffect(()=>{
        if(!regulonId && _regulonData){
            set_regulonData(undefined)
        }
    },[_regulonData, set_regulonData,regulonId])
    //console.log(regulonId);
    let Body = <div></div>
    if (regulonId && !_regulonData) {
        Body = <WebServices datamart_name={"getRegulonBy"}
            variables={{
                advancedSearch: `${regulonId}[_id]`,
                limit: 1
            }}
            getData={(data) => { set_regulonData(data) }}
            getState={(state) => {
                const titleState = {
                    loading: `Searching regulons ID ${regulonId}... wait a moment`,
                    done: "Regulon",
                    error: "sorry we have a problem ... try again later"
                }
                UpdateTitle({ state: state, title: titleState[state] })
            }}
        />
    }
    if (!regulonId) {
        Body = <Home />
    }else{
        if (_regulonData) {
            //console.log(_regulonData);
            if (_regulonData.data.length > 0) {
                UpdateTitle({ title: `Regulon ${_regulonData.data[0].transcriptionFactor.name}` })
                Body = <Details regulonData={_regulonData} />
            } else {
                UpdateTitle({ title: `Regulon error ` })
                Body = <div></div>
            }
        }
    }
    
    
    return (
        <div>
            <Title title="Regulon" />
            {Body}
        </div>
    );
}

export default Regulon;