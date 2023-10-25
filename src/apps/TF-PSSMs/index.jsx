import React, { useEffect, useState } from "react";
import { Cover, DataVerifier, Circular } from "../../components/ui-components";
import { Remarkable } from "remarkable";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArticleIcon from "@mui/icons-material/Article";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
//import IconButton from '@mui/material/IconButton';
//import DownloadIcon from '@mui/icons-material/Download';
import "./pss.css"

//metadata/meme/
function resolveCollections(setCollections) {
  fetch(process.env.REACT_APP_PROSSES_SERVICE + "/metadata/meme/")
    .then((response) => response.json())
    .then((collections) => {
      setCollections(collections);
    })
    .catch((error) => {
      console.error(error);
      setCollections([{ label: "error" }]);
    });
}

///wdps/metadata/meme/README.md
function resolveReadme(setReadme) {
  fetch(process.env.REACT_APP_PROSSES_SERVICE + "/metadata/meme/README.md")
    .then((response) => response.text())
    .then((readme) => {
      setReadme(readme);
    })
    .catch((error) => {
      console.error(error);
      setReadme("error");
    });
}

function resolveTFs(setTF, label) {
  fetch(process.env.REACT_APP_PROSSES_SERVICE + "/metadata/meme/" + label)
    .then((response) => response.json())
    .then((TFs) => {
      setTF(TFs);
    })
    .catch((error) => {
      console.error(error);
      setTF([{ label: "error" }]);
    });
}

export default function TFPSSMs() {
  const [readme, setReadme] = useState();
  const [document, setDocument] = useState();

  useEffect(() => {
    if (!DataVerifier.isValidArray(readme)) {
      resolveReadme(setReadme);
    }
  }, [readme]);

  const md = new Remarkable();
  md.set({
    html: true,
    breaks: true,
  });

  return (
    <div>
      <Cover>
        <h1>TF PSSMs Browser</h1>
      </Cover>
      <div style={{ display: "grid", gridTemplateColumns: "20% 80%" }}>
        <div style={{height: "80vh", overflow: "auto"}} >
          <Nav setDocument={setDocument} document={document} />
        </div>
        <div>
          {document ? (
            <div className="documentContainer">
              <iframe
                style={{ width: "100%", height: "100%", backgroundColor: "white" }}
                src={process.env.REACT_APP_PROSSES_SERVICE+document.url}
                title="TF PSSMs Browser"
              />
            </div>
          ) : (
            <div style={{ padding: "2%" }}>
              {readme ? (
                <p dangerouslySetInnerHTML={{ __html: md.render(readme) }} />
              ) : (
                <Circular />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Nav({ setDocument, document }) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (!DataVerifier.isValidArray(collections)) {
      resolveCollections(setCollections);
    }
  }, [collections]);

  if (!DataVerifier.isValidArray(collections)) {
    return <Circular />;
  }

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          PSSMs
        </ListSubheader>
      }
    >
      <ListItemButton
        sx={{ pl: 4 }}
        selected={document ? false : true}
        onClick={() => {
          setDocument(undefined);
        }}
      >
        <ListItemIcon>
          <BookmarkIcon />
        </ListItemIcon>
        <ListItemText primary="README" />
      </ListItemButton>
      {collections.map((collection, index) => {
        if (collection.label === "README.md") {
          return null;
        }
        return (
          <CollectionList
            key={"collection_" + index}
            collection={collection}
            document={document}
            setDocument={setDocument}
          />
        );
      })}
    </List>
  );
}

function CollectionList({ collection, setDocument, document }) {
  const [open, setOpen] = useState(false);
  const [TFs, setTFs] = useState([]);

  useEffect(() => {
    if (!DataVerifier.isValidArray(TFs)) {
      resolveTFs(setTFs, collection.label);
    }
  }, [TFs, collection]);

  let label = {
    all_tfbs: "Matrices for All TFBS",
    confirmed_strong_tfbs: "Matrices for Confirmed & Strong TFBS",
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={
            label[collection.label] ? label[collection.label] : collection.label
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {DataVerifier.isValidArray(TFs) ? (
          <List component="div" disablePadding>
            {TFs.map((TF, index) => {
              const url = "/meme/"+collection.label+"/"+TF.label+"/index.html"
              return (
                <ListItemButton
                  key={"TF_" + TF.label + "_" + index}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    setDocument({...TF, url: url});
                  }}
                  selected={document?.url === url}
                  
                >
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary={TF.label} />
                </ListItemButton>
              );
            })}
          </List>
        ) : (
          <Circular />
        )}
      </Collapse>
    </React.Fragment>
  );
}

export function TFPSSMsTest() {
  return (
    <div>
      <Cover>
        <h1>TF PSSMs Browser</h1>
      </Cover>
      <div>
        <iframe
          style={{ width: "100%", height: "80vh" }}
          src={process.env.REACT_APP_PROSSES_SERVICE + "/meme/"}
          title="TF PSSMs Browser"
        />
      </div>
    </div>
  );
}
