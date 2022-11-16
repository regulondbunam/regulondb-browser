import NavigationTabs from "./NavigationTabs";
import TranscriptionFactor from "./transcriptionFactor";

function Details({ regulonData }) {
    const data = regulonData.data[0]

    const tabsInfo = [
        {
            id: "regulonTab_01",
            name: "Transcription Factor",
        },
        {
            id: "regulonTab_02",
            name: "Regulates",
        },
        {
            id: "regulonTab_03",
            name: "Regulatory Interactions",
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
                <TranscriptionFactor transcriptionFactor={data.transcriptionFactor} allCitations={data.allCitations} />
            </article>
        </div>
    );
}

export default Details;