import React from 'react';
import Card from '../ui-components/infoDisplay/card/Card'
import {CountGenes} from '../apollo/Statistics'

const BodyHome = () => {
    return (
        <div style={{
            display: "flex",
        }}>
            <div style={{
                flex: "50%",
                padding: "10px"
            }}>
                <Card type="icon" width="100%" icon={"access_time"} iconDivStyle={{ padding: "26px", margin: "auto" }} iconStyle={{ fontSize: "55px" }}>
                    <h1>Releases</h1>
                </Card>
            </div>
            <div style={{
                flex: "50%",
                padding: "10px"
            }}>
                <Card type="icon" width="100%" icon={"analytics"} iconDivStyle={{ padding: "26px", margin: "auto" }} iconStyle={{ fontSize: "55px" }}>
                    <h1>Sumary</h1>
                    <p>Genes: {CountGenes()}</p>
                </Card>
            </div>

        </div>
    );
}

export default BodyHome;