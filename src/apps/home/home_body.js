import{ Card }from '../../components/ui-components/index'

const BodyHome = ({
    overviwes,
    name = '',
    version = '0.0.0'
}) => {
    return (
        <article>
            <div style={{
                flex: "50%",
                padding: "10px"
            }}>
                <Card type="icon" width="100%" icon={"access_time"} iconDivStyle={{ padding: "20px", margin: "auto" }} iconStyle={{ fontSize: "55px" }}>
                    <h2>{name}</h2>
                    <p>VERSION: {version}</p>
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

        </article>
    );
}

export default BodyHome;