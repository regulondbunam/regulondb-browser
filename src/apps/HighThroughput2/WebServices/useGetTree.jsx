
export default function useGetInitTree() {
  return [
    {
      id: "datasetType:TFBINDING",
      label: "TF Binding Sites",
      children: [
        {
          id: "source:REGULONDB&datasetType:TFBINDING",
          label: "Multiple_authors_methods",
          children: [
            {
              id: "source:REGULONDB&datasetType:TFBINDING&experimentType:ChIP-seq",
              label:"ChIP-seq",
            },
            {
              id: "source:REGULONDB&datasetType:TFBINDING&experimentType:ChIP-exo",
              label:"ChIP-exo",
            },
            {
              id: "source:REGULONDB&datasetType:TFBINDING&experimentType:gSELEX-chip",
              label:"gSELEX-chip",
            },
            {
              id: "source:REGULONDB&datasetType:TFBINDING&experimentType:DAP",
              label:"DAP",
            },
          ]
        }
      ]
    },
    {
      id: "datasetType:RNAP_BINDING_SITES",
      label: "RNAP Binding Sites",
      children: [
        {
          id: "source:REGULONDB&datasetType:RNAP_BINDING_SITES",
          label: "Multiple_authors_methods",
          children: [
            {
              id: "source:REGULONDB&datasetType:RNAP_BINDING_SITES&experimentType:ChIP-seq",
              label:"ChIP-seq",
            },
            {
              id: "source:REGULONDB&datasetType:RNAP_BINDING_SITES&experimentType:ChIP-exo",
              label:"ChIP-exo",
            },
            {
              id: "source:REGULONDB&datasetType:RNAP_BINDING_SITES&experimentType:gSELEX-chip",
              label:"gSELEX-chip",
            },
            {
              id: "source:REGULONDB&datasetType:RNAP_BINDING_SITES&experimentType:DAP",
              label:"DAP",
            },
          ]
        }
      ]
    },
    {
      id: "datasetType:TSS",
      label: "Transcription Start Sites",
      children: [
        {
          id: "source:REGULONDB&datasetType:TSS",
          label: "Multiple_authors_methods",
        }
      ]
    },
    {
      id: "datasetType:TTS",
      label: "Transcription Termination Sites",
      children: [
        {
          id: "source:REGULONDB&datasetType:TTS",
          label: "Multiple_authors_methods",
        }
      ]
    },
    {
      id: "datasetType:TUS",
      label: "Transcription Units",
      children: [
        {
          id: "source:REGULONDB&datasetType:TUS",
          label: "Multiple_authors_methods",
        }
      ]
    },
    {
      id: "datasetType:GENE_EXPRESSION",
      label: "Gene Expression",
      children: [
        {
          id: "source:REGULONDB&datasetType:GENE_EXPRESSION",
          label: "Multiple_authors_methods",
        }
      ]
    }
  ]
}