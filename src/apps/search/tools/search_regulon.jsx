import React ,{ useState } from "react";
import RegulonSearch from "../webServices/search_ws_regulon";
import Table from "../components/result_table";
import { SpinnerCircle } from "../../../components/ui-components/ui_components";

const SearchRegulon = ({
                         keyword = "",
                         regulonFounds = () => {
                             return 0;
                         },
                         regulonData = () => {
                             return {};
                         },
                         regulonStatus = () => {
                             return "sleep";
                         },
                         display = "table"
                     }) => {
    const [_data, set_data] = useState();
    const [_n, set_n] = useState(0);
    const [_state, set_state] = useState('sleep')
    return (
        <>
            <RegulonSearch
                search={keyword}
                limit={100}
                status={(status) => {
                    if (status === "loading") {
                        set_data();
                        set_n(0);
                        regulonFounds(0);
                    }
                    set_state(status)
                    regulonStatus(status);
                }}
                resoultsFound={(n) => {
                    set_n(n);
                    regulonFounds(n);
                }}
                resoultsData={(data) => {
                    set_data(data);
                    regulonData(data);
                }}
            />
            {
                displayState(_state,keyword,_data,_n)
            }
        </>
    );
};

export default SearchRegulon;

function displayState(state,keyword,data,n){

    switch (state) {
        case "error":
            return <>oops... an error has occurred</>
        case "loading":
            return <div>
                Loading Regulon data...
                <SpinnerCircle />
            </div>
        default:
            return <Table
                keyword={keyword}
                fieldOrder="name"
                id={"table_Regulon"}
                data={dataFormat(data)}
                title={`Regulon(${n})`}
                href_base={"/regulon/"}
            />
    }

}


function dataFormat(data) {
    //console.log(data)
    let rows = [];
    if (data) {
        data.map((doc) => {
            const id = doc?._id;
            const syns = doc?.transcriptionFactor?.synonyms;
            const conformations = doc?.transcriptionFactor?.conformations;
            const pro = conformations
                .map((p) => {
                    return p.name;
                })
                .join(",");
            const d = {
                name: `${doc?.transcriptionFactor?.name}, `,
                syn: syns.join(", "),
                conf: pro,
                id: id
            };
            rows.push(d);
            return null;
        });
    }
    const columns = [
        {
            label: "name",
            field: "name"
        },
        {
            label: "synonyms",
            field: "syn"
        },
        {
            label: "conformations",
            field: "conf"
        },
        {
            label: "id",
            field: "id"
        }
    ];
    return {
        columns: columns,
        rows: rows
    };
}
