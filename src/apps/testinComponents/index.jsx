import React from 'react';
import { Card, Cover, Button, IconButton } from "../../components/ui-components"
import Spinner from "../../components/ui-components/components/loading/Spinner"
import Circle from "../../components/ui-components/spinners/circle"
import { Tabs } from "../../components/ui-components/tab/tabs"
import DrawingTracesTool from "../../components/DrawingTracesTool"
import RegulatoryNetwork from "../../components/regulatoryNetwork/RegulatoryNetwork"
import ObjectListExplorer from "../../components/objectListExplorer"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import SpinnerError from "../../components/ui-components/components/loading/SpinnerError"

const attributesEnabled = [
    "_id",
    "productsName",
    "name",
    "synonyms"
]

export function TestComponents() {
    return (
        <div>
            <h1>Components in RegulonDB</h1>
            <article>
                <h2>ui-components</h2>
                <div style={{ marginLeft: "5%" }} >
                    <h3>Card</h3>
                    <Card type={"icon"} >
                        Hola
                    </Card>
                    <h3>Spinner Loading</h3>
                    <Spinner />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h3>Spinner Circle</h3>
                    <Circle />
                    <h3>Cover</h3>
                    <Cover>
                        <h1>Title</h1>
                    </Cover>
                    <h3>Tabs</h3>
                    <Tabs />
                    <h3>Buttons</h3>
                    <div style={{ display: "flex" }} ><Button>Hola</Button><IconButton /></div>
                </div>
                <h2>Drawing Traces Tool</h2>
                <div style={{ marginLeft: "5%" }}  >
                    <DrawingTracesTool leftEndPosition={25000} rightEndPosition={35000} />
                </div>
                <h2>Regulatory Network</h2>
                <div style={{ marginLeft: "5%" }}  >
                    <RegulatoryNetwork id_regulon={"RDBECOLITFC00049"} />
                </div>
                <OBJE />
            </article>

        </div>
    )
}

function OBJE() {
    const [datamartType, setDatamartType] = React.useState('gene');
    const [Rest, setRest] = React.useState(false);

    React.useEffect(() => {
        if (Rest) {
            setRest(false)
        }
    }, [Rest]);

    const handleChange = (event) => {
        setRest(true)
        setDatamartType(event.target.value);
    };

    const types = ["gene", "operon", "regulon", "srna"]

    return (
        <div>
            <h2>Datamart Object List Explorer</h2>
            <div style={{ marginLeft: "5%" }}  >
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Datamart selection</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={datamartType}
                        onChange={handleChange}
                        label="Datamart selection"
                    >
                        {types.map((type, index) => {
                            return <MenuItem key={`typeDatamart_${index}_${type}`} value={type}>{type}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                {!Rest && (
                   <ObjectListExplorer attributesEnabled={attributesEnabled} datamartType={datamartType} title={datamartType} /> 
                )}
            </div>
        </div>
    )
}