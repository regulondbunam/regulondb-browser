import React from 'react';
import Card from '../../../components/ui-components/infoDisplay/card/Card'
import conf from '../../../config/conf.json'


const BodyHome = () => {
    return (
        <div style={{
            display: "flex",
        }}>
            <div style={{
                flex: "50%",
                padding: "10px"
            }}>
                <Card type="icon" width="100%" icon={"access_time"} iconDivStyle={{ padding: "20px", margin: "auto" }} iconStyle={{ fontSize: "55px" }}>
                    <h2>{conf.appName}</h2>
                    <p>VERSION: {conf.version}</p>
                </Card>
            </div>
            <div style={{
                flex: "50%",
                padding: "10px"
            }}>
                <Card type="icon" width="100%" icon={"analytics"} iconDivStyle={{ padding: "20px", margin: "auto" }} iconStyle={{ fontSize: "55px" }}>
                    <h2>Overviews</h2>
                    <p></p>
                </Card>
            </div>

        </div>
    );
}

export default BodyHome;