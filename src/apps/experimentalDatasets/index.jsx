/*
# Component (user guide)

# ExperimentalDatasets
	
## Description  
	
Its main function is to display a list of downloadable file names and to provide download and browse functionality for these files.

## Category   
	
Visual

## Live demo 
--

## Installation or Implementation
--

## Usage 
--

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team:


# Component (technical guide)

## Component Type 
Visual

## Dependencies
React: React is the core library used to build user interfaces in web applications. It allows the creation of reusable components and facilitates application state management.
exData.css: This is a style sheet (CSS) file that provides specific styles for the ExperimentalDatasets component.
Cover: Cover is a custom component that is used to display a kind of header or cover page in the user interface.
DataVerifier:It is a custom utility or component that is likely to be used to check the validity of certain data or strings.
Circular: It is a component used to display a circular load indicator.
DownloadIcon: it is an icon provided by Material-UI that is used in a button to represent the action of downloading a file.
ManageSearchIcon: it is another icon provided by Material-UI that is used on a button to represent the file browsing and filtering action.
Button: it  is a Material-UI component used to create buttons in the user interface. In this context, it is used to create download and navigation buttons.
Tooltip: it is a Material-UI component that provides pop-up information when the user hovers over an element.
Link: it is a React Router component used to create navigation links within a React application.
useParams: it is a hook provided by React Router that is used to obtain parameters from the current URL.
BrowserFilter: it is custom component used to browse and filter files.
useLazyGetDataFile: it is a custom hook used to obtain data from a file asynchronously.
gql: it  is a function provided by Apollo Client that is used to define GraphQL queries as template strings.
useQuery: it is a hook provided by Apollo Client that is used to execute GraphQL queries and manage the results.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name   | Description                                                                                          |  Syntax   | Additional Notes or References | 
| --------| ---------------------------------------------------------------------------------------------------- | --------- | ------------------------------ |
|useQuery |it is a hook provided by Apollo Client that is used to execute GraphQL queries and manage the results.|useQuery();|                                |
|useParams|it is a hook provided by React Router that is used to obtain parameters from the current URL.         |useParams();|   



*/

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
import LoadingButton from '@mui/lab/LoadingButton';

/**
 * Description placeholder
 *
 * @type {*}
 */
const query_GET_AllFilesNames = gql`
  query Query {
    listAllFileNames
  }
`;

/**
 * Description placeholder
 *
 * @param {string} [str=""]
 * @returns {string}
 */
function formatMetaData(str = "") {
  /*let newStr = ""
  for (let index = 0; index < str.length; index += 50) {
    let endCut = 50 > str.length ? str.length : 50
    newStr += str.slice(index,endCut)
  }*/
  return str.replace("\t", "\n#\t");
}

/**
 * Description placeholder
 *
 * @export
 * @returns {React.JSX|HTMLElement}
 */
export default function ExperimentalDatasets() {
  const { data, loading: loadingFilesNames } = useQuery(
    query_GET_AllFilesNames
  );
  const [getFile, { loading: loadingFileData }] = useLazyGetDataFile();
  const { idFile } = useParams();

  /**
   * Description placeholder
   *
   * @param {*} file
   */
  const handleDownload = (file) => {
    switch (file.path.type) {
      case "graphQLservice":
        getFile({
          variables: { fileName: file.name },
          onCompleted: (data) => {
            console.log(data);
            const fileData = data.getDataOfFile;
            let fileInfo = "";
            if (DataVerifier.isValidString(fileData.license)) {
              fileInfo += "# License\n#\t" +fileData.license + "\n"
            }
            if (DataVerifier.isValidString(fileData.citation)) {
              fileInfo += "# Citation\n#\t" + fileData.citation + "\n";
            }
            if (DataVerifier.isValidObject(fileData.contact)) {
              fileInfo += `# Contact\n${
                DataVerifier.isValidString(fileData.contact.personName)
                  ? "#\tperson:" + fileData.contact.personName + "\n"
                  : ""
              }${
                DataVerifier.isValidString(fileData.contact.email)
                  ? "#\temail:" + fileData.contact.email + "\n"
                  : ""
              }${
                DataVerifier.isValidString(fileData.contact.webPage)
                  ? "#\twebPage:" + fileData.contact.webPage + "\n"
                  : ""
              }`;
            }
            if (DataVerifier.isValidString(fileData.creationDate)) {
              fileInfo += "#Date:\n#\t" +fileData.creationDate + "\n";
            }
            if (DataVerifier.isValidString(fileData.columnsDetails)) {
              fileInfo +=
                "#" + fileData.columnsDetails.replaceAll("\n", "\n#") + "\n";
            }
            if (DataVerifier.isValidString(fileData.content)) {
              fileInfo += fileData.content;
            }
            const blob = new Blob([fileInfo], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileData.fileName + ".tsv"
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove()
            //console.log(fileInfo);
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
    /**
     * Description placeholder
     *
     * @type {*}
     */
    let listFilesNames = [...data.listAllFileNames];
    if (idFile) {
      /**
       * Description placeholder
       *
       * @type {*}
       */
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
                if (/internal/.test(fileName)) {
                  return null;
                }
                return (
                  <tr key={"file_" + fileName + "_" + i}>
                    <td>{fileName}</td>
                    <td>
                      <Tooltip title="Download File">
                        <LoadingButton
                          loading={loadingFileData}
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
                        </LoadingButton>
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
