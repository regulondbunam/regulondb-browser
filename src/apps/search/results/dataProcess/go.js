import { DataVerifier } from "../../../../components/ui-components";

export default function goFormatResults(goTerm, keyword) {
  let results = [];
  if (DataVerifier.isValidArray(goTerm)) {
    goTerm.forEach((term) => {
      const {
        _id,
        description,
        genes,
        name,
        ontologyId,
        subclassOf,
        subclasses,
      } = term;
      //let re = new RegExp(`${keyword}`, "gm");
      let title = name + ", " + description;
      let matches = title
        .toLocaleLowerCase()
        .matchAll(keyword.toLocaleLowerCase());
      let score = [...matches].length;
      title = title.replaceAll(keyword, "<b>" + keyword + "</b>");
      results.push({
        _id: _id,
        data: term,
        type: "go",
        title: title,
        score: score,
      });
    });
  }
  results.sort((a, b) => b.score - a.score);
  return results;
}
