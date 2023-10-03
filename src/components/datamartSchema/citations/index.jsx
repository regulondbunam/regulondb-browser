import { ModalCitation } from "./modal";
import { ParagraphCitations, PC_VARIANTS } from "./paragraph";
import { NoteCitations } from "./note";
import useIndexedCitation, {
  AllCitationsDeprecated,
  AllCitations,
} from "./allCitations";

const CITATION_SIZE = {
  LARGE: "large",
  SMALL: "small",
  ONLY_INDEX: "index"
}

export {
  ModalCitation,
  ParagraphCitations,
  PC_VARIANTS,
  CITATION_SIZE,
  NoteCitations,
  AllCitationsDeprecated,
  AllCitations,
  useIndexedCitation,
};
