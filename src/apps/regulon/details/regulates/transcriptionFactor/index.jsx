import React from 'react';
import Table from "./table";
import { formatJsonTable } from "./utiles";
import TextField from '@mui/material/TextField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function TranscriptionFactor({ transcriptionFactor, idPanel = "regulates_transcriptionFactor" }) {
    const [_transcriptionFactor, set_transcriptionFactor] = React.useState();

    React.useEffect(() => {
        let panel = document.getElementById(idPanel)
        if (panel) {
            set_transcriptionFactor(formatJsonTable(panel, transcriptionFactor))
        }
    }, [transcriptionFactor, idPanel])

    const _handleUpdate = (event) => {
        //console.log(event.target.value)
        const keyword = event.target.value
        let str = new RegExp(keyword.toLowerCase());
        const filterSG = transcriptionFactor.filter(sg => (str.test(sg.name.toLowerCase())) || str.test(sg.id.toLowerCase()) || str.test(sg.function.toLowerCase()))
        let panel = document.getElementById(idPanel)
        if (panel) {
            set_transcriptionFactor(formatJsonTable(panel, filterSG))
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
            <h2>Transcription Factor</h2>
            <p className='p_accent'> {`Total of transcription factor: ${transcriptionFactor.length}`} </p>
            <div style={styleFilter}>
                <div><FilterAltIcon /></div>
                <div style={{ width: "50%" }} >
                    <TextField size="small" sx={{ width: "100%" }} id="sgFilter-basic" label="Filter" variant="standard"
                        onChange={_handleUpdate}
                    />
                </div>
                <div>
                    {_transcriptionFactor?.total &&(<p className='p_accent' > ({_transcriptionFactor.total}) </p>)}
                </div>
            </div>
            <div id={idPanel} style={{ margin: "0 2% 1px 5%" }} >
                {
                    !_transcriptionFactor
                        ? (<p>Loading...</p>)
                        : <Table columns={_transcriptionFactor.columns} data={_transcriptionFactor.data} link="/regulon" />
                }
            </div>
        </div>
    );
}

export default TranscriptionFactor;