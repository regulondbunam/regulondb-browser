import React from "react";
import "./exData.css";
import { Cover } from "../../components/ui-components";
import DownloadIcon from "@mui/icons-material/Download";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

const CATEGORIES_FILE = [
  {
    id: "Files01",
    description: "E. coli K-12 genome sequence used into RegulonDB",
    files: [
      {
        id: "ecoli_k12_sequence",
        name: "E. coli K-12 genome sequence raw format",
        path: "/media/raw/datasets/ecoli_k12/E_coli_K12_MG1655_U00096.3.txt",
        version: "",
        format: "txt",
        type: "sequence",
      },
      {
        id: "ecoli_k12_genebank",
        name: "E. coli K-12 genebank",
        path: "/media/raw/datasets/ecoli_k12/U00096.3.gbk",
        version: "",
        format: "gbk",
        type: "sequence",
      },
      {
        id: "ecoli_k12_genebank_refseq",
        name: "E. coli K-12 genebank refseq",
        path: "/media/raw/datasets/ecoli_k12/refseq_NC_000913.3.gbk",
        version: "",
        format: "gbk",
        type: "sequence",
      },
    ],
  },
  {
    id: "otherFiles",
    description: "other",
    files: [
      {
        id: "RISet",
        name: "RISet",
        path: "graphQLservice",
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "TUSet",
        name: "TUSet",
        path: "graphQLservice",
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "OperonSet",
        name: "OperonSet",
        path: "graphQLservice",
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "GeneProductSet",
        name: "GeneProductSet",
        path: "graphQLservice",
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "TerminatorSet",
        name: "TerminatorSet",
        path: "graphQLservice",
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "Gene_sequence",
        name: "Gene_sequence",
        path: "graphQLservice",
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "TFSet",
        name: "TFSet",
        path: "graphQLservice",
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "RegulatorSet",
        name: "RegulatorSet",
        path: "graphQLservice",
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "PromoterSet",
        name: "PromoterSet",
        path: "graphQLservice",
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "NetworkTFGene",
        name: "NetworkTFGene",
        path: "graphQLservice",
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "NetworkTFGene_release4",
        name: "NetworkTFGene_release4",
        path: "graphQLservice",
        version: "",
        format: "tsv",
        type: "table",
      },
    ],
  },
];

export default function ExperimentalDatasets() {
  const handleDownload = (file) => {};

  return (
    <div>
      <Cover>
        <h1>Downloadable Experimental Datasets</h1>
      </Cover>
      <div style={{ margin: "1% 5% 1% 5%" }}>
        <table className="tableED">
          <thead>
            <tr>
              <th>Description</th>
              <th>File</th>
              <th>Download</th>
              <th>Browse and Filter</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES_FILE.map((category, i) => {
              return (
                <React.Fragment key={"category_" + i + "_" + category.id}>
                  {category.files.map((file, i) => {
                    return (
                      <tr
                        key={
                          "file_" +
                          file.id +
                          "_" +
                          i +
                          "_category_" +
                          category.id
                        }
                      >
                        {i === 0 && (
                          <td rowSpan={category.files.length}>
                            {category.description}
                          </td>
                        )}
                        <td>{file.name}</td>
                        <td>
                          <Tooltip title="Download File">
                            <Button
                              onClick={() => {
                                handleDownload(file);
                              }}
                              variant="outlined"
                            >
                              <DownloadIcon />
                            </Button>
                          </Tooltip>
                        </td>
                        <td>
                          <Tooltip title="Browse & Filter">
                            <Link to={"/datasets/" + file.id}>
                              <Button variant="outlined">
                                <ManageSearchIcon />
                              </Button>
                            </Link>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
