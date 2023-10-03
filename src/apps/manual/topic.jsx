import { Remarkable } from "remarkable";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const gitUrl = (rawUrl, imgUrl) => {
  return (
    "https://github.com/" +
    rawUrl.replace(
      /^https:\/\/raw\.githubusercontent\.com\/(.*\/)([^/]+)\.md$/,
      "$1"
    ) +
    imgUrl.replace(/^\.\//, "") +
    "?raw=true"
  );
};
function urlReplace(markdown) {
  const reg = /!\[.*\]\((\..*\/.*\.[a-zA-Z0-9]+)\)/
  const urlImages = markdown.match(reg);
  return null
}

const downloadMD = async (setMarkdown, urlRaw) => {
  try {
    const response = await fetch(urlRaw);
    const markdown = await response.text();

    setMarkdown(markdown);
  } catch (error) {
    console.error("fetch error", error);
    setMarkdown({
      error: {
        type: "fetch",
        log: error,
      },
    });
  }
};

const md = new Remarkable();
md.set({
  html: true,
  breaks: true,
});

export default function Topic({ rawUrl, _url, title }) {
  const [markdown, setMarkdown] = useState();

  if (!markdown) {
    downloadMD(setMarkdown, rawUrl);
  }

  if (!markdown) {
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <CircularProgress />
      </div>
    );
  }
  if (markdown?.error) {
    return (
      <div>
        <h2>{markdown.error.type + " "}error</h2>
        <p>{markdown.error.log}</p>
      </div>
    );
  }

  return (
    <div style={{ margin: "2%" }}>
      <p dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />
    </div>
  );
}
