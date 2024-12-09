import DataVerifier from "../utils"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

export default function formatTFBS(datasets = [], experimentType) {
    let table = {
        columns: [
            {
                label: "id",
            },
            {
                label: "Transcription Factor",
            },
            {
                label: "Dataset Title"
            },
            {
                label: "Strategy",
                setFilter: experimentType
            },
            {
                label: "Genes",
            },
            {
                label: "Publication Title",
                hide: true
            },
            {
                label: "Publication Authors",
                hide: true
            },
            {
                label: "Growth Conditions",
            },
        ],
        data: []
    }
    // processData
    datasets.forEach(dataset => {
        let objects = []
        let genes = []
        if (DataVerifier.isValidArray(dataset.objectsTested)) {
            dataset.objectsTested.forEach((obj) => {
                objects.push(obj.name)
                if (DataVerifier.isValidArray(obj.genes)) {
                    genes = obj.genes.map(gene => gene.name)
                }
            })
        }
        let publicationsTitle = []
        let publicationsAuthors = new Set()
        if (DataVerifier.isValidArray(dataset.publications)) {
            dataset.publications.forEach((publication) => {
                publicationsTitle.push(publication.title)
                if (DataVerifier.isValidArray(publication.authors)) {
                    publication.authors.forEach(author => publicationsAuthors.add(author))
                }
            })
        }
        let growthConditions = []
        if (DataVerifier.isValidObject(dataset.growthConditions)) {
            Object.keys(dataset.growthConditions).forEach(key => {
                if (DataVerifier.isValidString(dataset.growthConditions[key]) && !key.includes("__")) {
                    growthConditions.push(`${key}: ${dataset.growthConditions[key]}`)
                }

            })
        }
        table.data.push({
            "id": <LinkDataset value={dataset._id} datasetId={dataset._id} />,
            "Transcription Factor": objects.join(", "),
            "Dataset Title": DataVerifier.isValidString(dataset?.sample?.title) ? dataset?.sample?.title : "",
            "Strategy": dataset?.sourceSerie?.strategy,
            "Genes": genes.join(", "),
            "Publication Title": publicationsTitle.join(", "),
            "Publication Authors": [...publicationsAuthors].join(", "),
            "Growth Conditions": growthConditions.join("; ")
        })
    })
    return table
}

function LinkDataset({ datasetId }) {
    const navigate = useNavigate()
    //TFBINDING
    return <Button onClick={() => { navigate("./dataset/TFBINDING/datasetId=" + datasetId) }} >{datasetId}</Button>
}