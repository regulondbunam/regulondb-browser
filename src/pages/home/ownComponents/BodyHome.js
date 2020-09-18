import React from 'react';
import Card from '../../../components/ui-components/infoDisplay/card/Card'


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
                    <h2>RegulonDB-Browser</h2>
                    <p>VERSION: alpha-0.0.22</p>
                </Card>
            </div>
            <div style={{
                flex: "50%",
                padding: "10px"
            }}>
                <Card type="icon" width="100%" icon={"analytics"} iconDivStyle={{ padding: "26px", margin: "auto" }} iconStyle={{ fontSize: "55px" }}>
                    <h2>Sumary</h2>
                    <p>Genes: maybe 46700 :s</p>
                </Card>
            </div>

        </div>
    );
}

export default BodyHome;