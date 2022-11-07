import { useState, useMemo } from "react";
import TableList from './table';

const idPanel = "TP_divContent"

function formatJsonTable(transcribedPromoters=[]){
    //            width: cellWidth
    let columns = [
        {
            Header: '---',
            accessor: `_data`,
            width: "100%"
        },
    ]
    let data = []
    if (transcribedPromoters.length > 0) {
        transcribedPromoters.forEach(tp => {
            data.push({
                _data: tp
            })
        });
    }
    return { columns: columns, data: data}
}

function Promoters({ transcribedPromoters }) {
    const jtTP = useMemo(() => {
        return formatJsonTable(transcribedPromoters)
    }, [transcribedPromoters])
    const [_jtTP, set_jtTP] = useState(jtTP);
    //console.log(_jtTP);
    

    return (
        <div>
            <article>
                <h2>Transcribed Promoters</h2>
                    <div id={idPanel} >
                        <div>
                            <TableList columns={_jtTP.columns} data={_jtTP.data} />
                        </div>
                    </div>
            </article>
        </div>
    );
}

export default Promoters;  