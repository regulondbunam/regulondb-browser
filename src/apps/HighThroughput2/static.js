export const DATASET_TYPE_NAME = (datasetType) => {
  switch (datasetType) {
    case "TFBINDING":
        return "TF Binding Sites"
    case "TSS":
        return "Transcription Start Sites"
    case "TTS":
        return "Transcription Termination Sites"
    case "TUS":
        return "Transcription Units"
    case "GENE_EXPRESSION":
        return "Gene Expression"
    case "RNAP_BINDING_SITES":
        return "RNAP Binding Sites"
    default:
      return datasetType;
  }
};

export const SOURCE_NAMES = (source) =>{
    switch (source) {
        case "REGULONDB":
            return "Multiple_authors_methods"
        default:
            return source;
    }
}