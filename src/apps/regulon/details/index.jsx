import NavigationTabs from "./NavigationTabs";
import Regulates from "./regulates";
import TranscriptionFactor from "./transcriptionFactor";

function Details({ regulonData }) {
    const data = regulonData.data[0]

    const tabsInfo = [
        {
            id: "regulonTab_01",
            name: "Transcription Factor",
        },
        {
            id: "regulonTab_03",
            subtitle: "Regulatory",
            name: "Network",
        },
        {
            id: "regulonTab_02",
            name: "Regulates",
        },
        {
            id: "regulonTab_03",
            subtitle: "Regulatory",
            name: "Interactions",
        },
        {
            id: "regulonTab_04",
            name: "Terms",
        },
        {
            id: "regulonTab_05",
            name: "Citations",
        },
    ];


    return (
        <div>
            <NavigationTabs tabsInfo={tabsInfo} tabSelect={"regulonTab_01"} />
            <article>
                <div id="transcriptionFactor" >
                    <TranscriptionFactor transcriptionFactor={data.transcriptionFactor} allCitations={data.allCitations} />
                </div>
                <br />
                { data?.regulates && (
                    <div id="regulates">
                    <Regulates regulates={data.regulates} allCitations={data.allCitations} />
                </div>
                )}
                
            </article>
        </div>
    );
}

export default Details;