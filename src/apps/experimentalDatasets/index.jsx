import React from "react";
import "./exData.css";
import { Cover } from "../../components/ui-components";
import DownloadIcon from "@mui/icons-material/Download";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Link, useParams } from "react-router-dom";
import BrowserFilter from "./browserFilter";

const CATEGORIES_FILE = [
  {
    id: "Files01",
    description: "E. coli K-12 genome sequence used into RegulonDB",
    files: [
      {
        id: "ecoli_k12_sequence",
        name: "E. coli K-12 genome sequence raw format",
        path: {
            url: "/media/raw/datasets/ecoli_k12/E_coli_K12_MG1655_U00096.3.txt",
            type: "inner"
        },
        version: "",
        format: "txt",
        type: "sequence",
      },
      {
        id: "ecoli_k12_genebank",
        name: "E. coli K-12 genebank",
        path: {
            url: "/media/raw/datasets/ecoli_k12/U00096.3.gbk",
            type: "inner"
        },
        version: "",
        format: "gbk",
        type: "sequence",
      },
      {
        id: "ecoli_k12_genebank_refseq",
        name: "E. coli K-12 genebank refseq",
        path: {
            url: "/media/raw/datasets/ecoli_k12/refseq_NC_000913.3.gbk",
            type: "inner"
        },
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
        path: {
          url: "",
          type: "graphQLservice",
        },
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "TUSet",
        name: "TUSet",
        path: {
          url: "",
          type: "graphQLservice",
        },
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "OperonSet",
        name: "OperonSet",
        path: {
          url: "",
          type: "graphQLservice",
        },
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "GeneProductSet",
        name: "GeneProductSet",
        path: {
          url: "",
          type: "graphQLservice",
        },
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "TerminatorSet",
        name: "TerminatorSet",
        path: {
          url: "",
          type: "graphQLservice",
        },
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "Gene_sequence",
        name: "Gene_sequence",
        path: {
          url: "",
          type: "graphQLservice",
        },
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "TFSet",
        name: "TFSet",
        path: {
          url: "",
          type: "graphQLservice",
        },
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "RegulatorSet",
        name: "RegulatorSet",
        path: {
          url: "",
          type: "graphQLservice",
        },
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "PromoterSet",
        name: "PromoterSet",
        path: {
          url: "",
          type: "graphQLservice",
        },
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "NetworkTFGene",
        name: "NetworkTFGene",
        path: {
          url: "",
          type: "graphQLservice",
        },
        version: "",
        format: "tsv",
        type: "table",
      },
      {
        id: "NetworkTFGene_release4",
        name: "NetworkTFGene_release4",
        path: {
          url: "",
          type: "graphQLservice",
        },
        version: "",
        format: "tsv",
        type: "table",
      },
    ],
  },
];

export default function ExperimentalDatasets() {
  const { idFile } = useParams();

  const handleDownload = (file) => {};
  if (idFile) {
    let file;
    // eslint-disable-next-line no-unused-vars
    const category = CATEGORIES_FILE.find((category) => {
      file = category.files.find((file) => file.id === idFile);
      if (file) {
        return true;
      }
      return false;
    });
    if (!file) {
      return <>there is no file with this id:{idFile}</>;
    }
    return <BrowserFilter fileName={file.name} filePath={file.path} file={file} />;
  }
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
