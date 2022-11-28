import NavigationTabs from "./NavigationTabs";
import Regulates from "./regulates";
import TranscriptionFactor from "./transcriptionFactor";
import DiagramRegulatoryNetwork from "./regulatoryNetwork";
import RegulatoryInteractions from "./regulatoryInteractions";

function Details({ regulonData }) {
    const data = regulonData.data[0]

    const tabsInfo = [
        {
            id: "regulonTab_01",
            name: "Transcription Factor",
        },
        {
            id: "regulonTab_02",
            subtitle: "Regulatory",
            name: "Network",
        },
        {
            id: "regulonTab_03",
            name: "Regulates",
        },
        {
            id: "regulonTab_04",
            subtitle: "Regulatory",
            name: "Interactions",
        },
        {
            id: "regulonTab_05",
            name: "Terms",
        },
        {
            id: "regulonTab_06",
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
                <div>
                    <DiagramRegulatoryNetwork regulonId={data._id} />
                </div>
                <br />
                { data?.regulates && (
                    <div id="regulates">
                    <Regulates regulates={data.regulates} allCitations={data.allCitations} />
                </div>
                )}
                <br />
                { data.regulatoryInteractions.length > 0 &&(
                    <div id="regulatoryInteraction">
                        <RegulatoryInteractions regulatoryInteractions={data.regulatoryInteractions} allCitations={data.allCitations} />
                    </div>
                )}
            </article>
        </div>
    );
}

export default Details;