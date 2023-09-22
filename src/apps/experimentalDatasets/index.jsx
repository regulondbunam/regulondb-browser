import React from "react";
import "./exData.css";
import { Cover, DataVerifier, Circular } from "../../components/ui-components";
import DownloadIcon from "@mui/icons-material/Download";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Link, useParams } from "react-router-dom";
import BrowserFilter from "./browserFilter";
import { useLazyGetDataFile } from "../../components/webservices";
import { gql, useQuery } from "@apollo/client";

const query_GET_AllFilesNames = gql`
  query Query {
    listAllFileNames
  }
`;

function formatMetaData(str = "") {
  /*let newStr = ""
  for (let index = 0; index < str.length; index += 50) {
    let endCut = 50 > str.length ? str.length : 50
    newStr += str.slice(index,endCut)
  }*/
  return str.replace("\t", "\n#\t");
}

export default function ExperimentalDatasets() {
  const {
    data,
    loading: loadingFilesNames,
    error,
  } = useQuery(query_GET_AllFilesNames);
  const [getFile, { loading: loadingFileData }] = useLazyGetDataFile();
  const { idFile } = useParams();

  const handleDownload = (file) => {
    //console.log(file);
    switch (file.path.type) {
      case "graphQLservice":
        getFile({
          variables: { fileName: file.name },
          onCompleted: (data) => {
            const fileData = data.getDataOfFile;
            //console.log(fileData);
            let fileInfo = "";
            if (DataVerifier.isValidString(fileData.license)) {
              fileInfo +=
                "# Copies and Copyright-Notice \n#\t" +
                formatMetaData(fileData.license) +
                "\n#\n";
            }
            if (DataVerifier.isValidString(fileData.citation)) {
              fileInfo +=
                "# Citation\n#\t" + formatMetaData(fileData.citation) + "\n";
            }
            if (DataVerifier.isValidObject(fileData.contact)) {
              fileInfo += `# Contact\n${
                DataVerifier.isValidString(fileData.personName)
                  ? "#\tperson:" + fileData.personName + "\n"
                  : ""
              }${
                DataVerifier.isValidString(fileData.email)
                  ? "#\temail:" + fileData.email + "\n"
                  : ""
              }${
                DataVerifier.isValidString(fileData.webPage)
                  ? "#\twebPage:" + fileData.webPage + "\n"
                  : ""
              }`;
            }
            if (DataVerifier.isValidString(fileData.creationDate)) {
              fileInfo += "#Date: " + fileData.creationDate + "\n";
            }
            if (DataVerifier.isValidString(fileData.content)) {
              fileInfo += fileData.content;
            }
            //console.log(fileInfo);
            const element = document.createElement("a");
            element.setAttribute(
              "href",
              "data:text/plain;charset=utf-8," + encodeURIComponent(fileInfo)
            );
            element.setAttribute("download", fileData.fileName);
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            element.remove();
          },
          onError: (error) => {
            console.log(error);
          },
        });
        break;

      default:
        break;
    }
  };

  if (loadingFilesNames) {
    return (
      <div>
        <Cover>
          <h1>Loading Files...</h1>
        </Cover>
        <Circular />
      </div>
    );
  }

  if (data) {
    let listFilesNames = [...data.listAllFileNames]
    listFilesNames.sort();
    if (idFile) {
      const fileName = listFilesNames.find((fileName) => fileName === idFile);
      if (!fileName) {
        return <>there is no file with this name or id:{idFile}</>;
      }
      return (
        <BrowserFilter
          fileName={fileName}
          filePath={{
            url: "",
            type: "graphQLservice",
          }}
          file={{
            name: fileName,
            type: "table",
          }}
        />
      );
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
                <th>File</th>
                <th>Download</th>
                <th>Browse and Filter</th>
              </tr>
            </thead>
            <tbody>
              {listFilesNames.map((fileName, i) => {
                return (
                  <tr key={"file_" + fileName + "_" + i}>
                    <td>{fileName}</td>
                    <td>
                      <Tooltip title="Download File">
                        <Button
                          disabled={loadingFileData}
                          onClick={() => {
                            handleDownload({
                              id: fileName,
                              name: fileName,
                              path: {
                                url: "",
                                type: "graphQLservice",
                              },
                              version: "",
                              format: "tsv",
                              type: "table",
                            });
                          }}
                          variant="outlined"
                        >
                          <DownloadIcon />
                        </Button>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip title="Browse & Filter">
                        <Link to={"/datasets/" + fileName}>
                          <Button variant="outlined">
                            <ManageSearchIcon />
                          </Button>
                        </Link>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return <></>;
}

/*
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
                          <td>{file.name}</td>
                          <td>
                            <Tooltip title="Download File">
                              <Button
                                disabled={loadingFileData}
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

 {
    id: "Files01",
    description: "E. coli K-12 genome sequence used into RegulonDB",
    files: [
      {
        id: "ecoli_k12_sequence",
        name: "E. coli K-12 genome sequence raw format",
        path: {
          url: "/media/raw/datasets/ecoli_k12/E_coli_K12_MG1655_U00096.3.txt",
          type: "inner",
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
          type: "inner",
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
          type: "inner",
        },
        version: "",
        format: "gbk",
        type: "sequence",
      },
    ],
  },

const CATEGORIES_FILE = [
 
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
*/

/**
  {i === 0 && (
                          <td rowSpan={category.files.length}>
                            {category.description}
                          </td>
                        )}
 */
