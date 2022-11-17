import React from 'react';
import Table from "./table";
import { formatJsonTable } from "./utiles";
import TextField from '@mui/material/TextField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function TranscriptionUnit({ transcriptionUnit, idPanel = "regulates_transcriptionUnit" }) {
    const [_transcriptionUnit, set_transcriptionUnit] = React.useState();

    React.useEffect(() => {
        let panel = document.getElementById(idPanel)
        if (panel) {
            set_transcriptionUnit(formatJsonTable(panel, transcriptionUnit))
        }
    }, [transcriptionUnit, idPanel])

    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        let str = new RegExp(keyword.toLowerCase());
        const filterSG = transcriptionUnit.filter(sg => (str.test(sg.name.toLowerCase())) || str.test(sg.id.toLowerCase()) || str.test(sg.function.toLowerCase()))
        let panel = document.getElementById(idPanel)
        if (panel) {
            set_transcriptionUnit(formatJsonTable(panel, filterSG))
        }

    }

    const styleFilter = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "10px",
        marginRight: "10px"
    }

    return (
        <div>
            <h2>Transcription Unit</h2>
            <p className='p_accent'> {`Total of transcription Unit: ${transcriptionUnit.length}`} </p>
            <div style={styleFilter}>
                <div><FilterAltIcon /></div>
                <div style={{ width: "50%" }} >
                    <TextField size="small" sx={{ width: "100%" }} id="sgFilter-basic" label="Filter" variant="standard"
                        onChange={_handleUpdate}
                    />
                </div>
                <div>
                    {_transcriptionUnit?.total &&(<p className='p_accent' > ({_transcriptionUnit.total}) </p>)}
                </div>
            </div>
            <div id={idPanel} style={{ margin: "0 2% 1px 5%" }} >
                {
                    !_transcriptionUnit
                        ? (<p>Loading...</p>)
                        : <Table columns={_transcriptionUnit.columns} data={_transcriptionUnit.data} link="/gene" />
                }
            </div>
        </div>
    );
}

export default TranscriptionUnit;