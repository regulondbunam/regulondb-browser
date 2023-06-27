import ResultsTable from "../query/resultsTable";
import CoexpressionTable from "./coexpressionTable";

function GeneDescription(props) {
    const { gene, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    <ResultsTable genesData={[gene]}/>
                    <br/>
                    <br/>
                    <h2 style={{color: "#3d779b"}}>Top 50 Coexpression Ranking</h2>
                    <br/>
                    <CoexpressionTable idGene={gene.gene._id} />
                </div>
            )}
        </div>
    );

}
export default GeneDescription;