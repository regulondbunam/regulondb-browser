import { gql } from "@apollo/client";

export const /** object */ QUERY_GETGUBY = gql`
    query GetGUsBy($advancedSearch: String) {
      getGUsBy(advancedSearch: $advancedSearch) {
        data {
          _id
          gensorUnit {
            components {
              function
              name
              type
            }
            description
            geneOntology {
              biologicalProcess {
                _id
                name
              }
              cellularComponent {
                _id
                name
              }
              molecularFunction {
                _id
                name
              }
            }
            groups
            _id
            name
            note
            signalName
          }
          reactions {
            components {
              function
              name
              type
            }
            description
            name
            number
            order
            pathwayComponents
            type
          }
          totalOfComponents
        }
      }
    }
  `;

export const /** object */ RESPONSE_DATA = {
    getGUsBy: {
      data: [
        {
          _id: "RDBECOLIGUC00001",
          gensorUnit: {
            components: [
              {
                function: "protein",
                name: "AdiA",
                type: "protein",
              },
              {
                function: "protein",
                name: "AdiY",
                type: "protein",
              },
              {
                function: "simple_molecule",
                name: "CO2",
                type: "simple_molecule",
              },
              {
                function: "simple_molecule",
                name: "GABA",
                type: "simple_molecule",
              },
              {
                function: "simple_molecule",
                name: "GABA_Ext",
                type: "simple_molecule",
              },
              {
                function: "protein",
                name: "GadA",
                type: "protein",
              },
              {
                function: "protein",
                name: "GadB",
                type: "protein",
              },
              {
                function: "protein",
                name: "GadC",
                type: "protein",
              },
              {
                function: "protein",
                name: "GadX",
                type: "protein",
              },
              {
                function: "protein",
                name: "GltB",
                type: "protein",
              },
              {
                function: "protein",
                name: "GltD",
                type: "protein",
              },
              {
                function: "complex",
                name: "GltD-GltB",
                type: "complex",
              },
              {
                function: "protein",
                name: "GltF",
                type: "protein",
              },
              {
                function: "simple_molecule",
                name: "L-glutamate",
                type: "simple_molecule",
              },
              {
                function: "simple_molecule",
                name: "L-glutamate_Ext",
                type: "simple_molecule",
              },
              {
                function: "gene",
                name: "adiA",
                type: "gene",
              },
              {
                function: "RNA",
                name: "adiA_mRNA",
                type: "RNA",
              },
              {
                function: "simple_molecule",
                name: "agmatine",
                type: "simple_molecule",
              },
              {
                function: "simple_molecule",
                name: "arginine",
                type: "simple_molecule",
              },
              {
                function: "gene",
                name: "gadAX",
                type: "gene",
              },
              {
                function: "RNA",
                name: "gadAX_mRNA",
                type: "RNA",
              },
              {
                function: "gene",
                name: "gadBC",
                type: "gene",
              },
              {
                function: "RNA",
                name: "gadBC_mRNA",
                type: "RNA",
              },
              {
                function: "gene",
                name: "gltBDF",
                type: "gene",
              },
              {
                function: "RNA",
                name: "gltBDF_mRNA",
                type: "RNA",
              },
            ],
            description: null,
            geneOntology: {
              BiologicalProcess: [
                {
                  _id: "RDBECOLIGEO00003",
                  name: "GO:1902475 - L-alpha-amino acid transmembrane transport",
                },
                {
                  _id: "RDBECOLIGEO00004",
                  name: "GO:0097054 - L-glutamate biosynthetic process",
                },
              ],
              CellularComponent: [
                {
                  _id: "RDBECOLIGEO00001",
                  name: "GO:0005737 - cytoplasm",
                },
                {
                  _id: "RDBECOLIGEO00002",
                  name: "GO:0005829 - cytosol",
                },
              ],
              MolecularFunction: [
                {
                  _id: "RDBECOLIGEO00005",
                  name: "GO:0003677 - DNA binding",
                },
                {
                  _id: "RDBECOLIGEO00006",
                  name: "GO:0015297- antiporter activity",
                },
              ],
            },
            groups: ["Transcription", "Amino acid transport and metabolism"],
            id: "RDBECOLIGUC00001",
            name: "AdiY",
            note: "This is a example document of GENSOR UNIT DATAMART",
            signalName: [],
          },
          reactions: [
            {
              components: [
                {
                  function: "activator",
                  name: "AdiY",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "adiA",
                  type: "gene",
                },
                {
                  function: "product",
                  name: "adiA_mRNA",
                  type: "RNA",
                },
              ],
              description:
                "Transcription of transcription unit adiA. Reaction activation by AdiY.",
              name: "adiA -> adiA_mRNA",
              number: 1,
              order: 0,
              pathwayComponents: "adiA - AdiY -> adiA_mRNA",
              type: "transcription",
            },
            {
              components: [
                {
                  function: "activator",
                  name: "AdiY",
                  type: "proteib",
                },
                {
                  function: "reactant",
                  name: "gadAX",
                  type: "gene",
                },
                {
                  function: "product",
                  name: "gadAX_mRNA",
                  type: "RNA",
                },
              ],
              description:
                "Transcription of transcription unit gadAX. Reaction activation by AdiY.",
              name: "gadAX -> gadAX_mRNA",
              number: 2,
              order: 0,
              pathwayComponents: "gadAX - AdiY -> gadAX_mRNA",
              type: "transcription",
            },
            {
              components: [
                {
                  function: "activator",
                  name: "AdiY",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "gadBC",
                  type: "gene",
                },
                {
                  function: "product",
                  name: "gadBC_mRNA",
                  type: "RNA",
                },
              ],
              description:
                "Transcription of transcription unit gadBC. Reaction activation by AdiY.",
              name: "gadBC -> gadBC_mRNA",
              number: 3,
              order: 0,
              pathwayComponents: "gadBC - AdiY -> gadBC_mRNA",
              type: "transcription",
            },
            {
              components: [
                {
                  function: "activator",
                  name: "AdiY",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "gltBDF",
                  type: "gene",
                },
                {
                  function: "product",
                  name: "gltBDF_mRNA",
                  type: "RNA",
                },
              ],
              description:
                "Transcription of transcription unit gltBDF. Reaction activation by AdiY.",
              name: "gltBDF -> gltBDF_mRNA",
              number: 4,
              order: 0,
              pathwayComponents: "gltBDF - AdiY -> gltBDF_mRNA",
              type: "transcription",
            },
            {
              components: [
                {
                  function: "product",
                  name: "GltB",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "gltBDF_mRNA",
                  type: "RNA",
                },
              ],
              description: "Translation of GltB",
              name: "gltBDF_mRNA -> GltB",
              number: 5,
              order: 0,
              pathwayComponents: "gltBDF_mRNA -> GltB",
              type: "translation",
            },
            {
              components: [
                {
                  function: "reactant",
                  name: "GltB",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "GltD",
                  type: "protein",
                },
                {
                  function: "product",
                  name: "GltD-GltB",
                  type: "complex",
                },
              ],
              description: "Reaction transforming GltD, GltB into GltD-GltB",
              name: "GltD + GltB -> GltD-GltB",
              number: 6,
              order: 0,
              pathwayComponents: "GltD + GltB -> GltD-GltB",
              type: "state transition",
            },
            {
              components: [
                {
                  function: "product",
                  name: "GltD",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "gltBDF_mRNA",
                  type: "RNA",
                },
              ],
              description: "Translation of GltD",
              name: "gltBDF_mRNA -> GltD",
              number: 7,
              order: 0,
              pathwayComponents: "gltBDF_mRNA -> GltD",
              type: "translation",
            },
            {
              components: [
                {
                  function: "product",
                  name: "GltF",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "gltBDF_mRNA",
                  type: "RNA",
                },
              ],
              description: "Translation of GltF",
              name: "gltBDF_mRNA -> GltF",
              number: 8,
              order: 0,
              pathwayComponents: "gltBDF_mRNA -> GltF",
              type: "translation",
            },
            {
              components: [
                {
                  function: "product",
                  name: "GadB",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "gadBC_mRNA",
                  type: "RNA",
                },
              ],
              description: "Translation of GadB",
              name: "gadBC_mRNA -> GadB",
              number: 9,
              order: 0,
              pathwayComponents: "gadBC_mRNA -> GadB",
              type: "translation",
            },
            {
              components: [
                {
                  function: "product",
                  name: "CO2",
                  type: "simple_molecule",
                },
                {
                  function: "product",
                  name: "GABA",
                  type: "simple_molecule",
                },
                {
                  function: "catalyzer",
                  name: "GadA",
                  type: "protein",
                },
                {
                  function: "catalyzer",
                  name: "GadB",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "L-glutamate",
                  type: "simple_molecule",
                },
              ],
              description: "Reaction transforming L-glutamate into GABA, CO2",
              name: "L-glutamate -> GABA + CO2",
              number: 10,
              order: 0,
              pathwayComponents: "L-glutamate - GadA - GadB -> GABA + CO2",
              type: "state transition",
            },
            {
              components: [
                {
                  function: "product",
                  name: "GadC",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "gadBC_mRNA",
                  type: "RNA",
                },
              ],
              description: "Translation of GadC",
              name: "gadBC_mRNA -> GadC",
              number: 11,
              order: 0,
              pathwayComponents: "gadBC_mRNA -> GadC",
              type: "translation",
            },
            {
              components: [
                {
                  function: "product",
                  name: "GABA",
                  type: "simple_molecule",
                },
                {
                  function: "reactant",
                  name: "GABA_Ext",
                  type: "simple_molecule",
                },
                {
                  function: "catalyzer",
                  name: "GadC",
                  type: "protein",
                },
                {
                  function: "product",
                  name: "L-glutamate",
                  type: "simple_molecule",
                },
                {
                  function: "reactant",
                  name: "L-glutamate_Ext",
                  type: "simple_molecule",
                },
              ],
              description:
                "Transport of L-glutamate_Ext, GABA_Ext through a bacterial membrane, leading to the presence of L-glutamate, GABA inside the cell.",
              name: "L-glutamate_Ext + GABA_Ext -> L-glutamate + GABA",
              number: 12,
              order: 0,
              pathwayComponents:
                "L-glutamate_Ext + GABA_Ext - GadC -> L-glutamate + GABA",
              type: "transport",
            },
            {
              components: [
                {
                  function: "product",
                  name: "GadA",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "gadAX_mRNA",
                  type: "RNA",
                },
              ],
              description: "Translation of GadA",
              name: "gadAX_mRNA -> GadA",
              number: 13,
              order: 0,
              pathwayComponents: "gadAX_mRNA -> GadA",
              type: "translation",
            },
            {
              components: [
                {
                  function: "product",
                  name: "GadX",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "gadAX_mRNA",
                  type: "RNA",
                },
              ],
              description: "Translation of GadX",
              name: "gadAX_mRNA -> GadX",
              number: 14,
              order: 0,
              pathwayComponents: "gadAX_mRNA -> GadX",
              type: "translation",
            },
            {
              components: [
                {
                  function: "product",
                  name: "AdiA",
                  type: "protein",
                },
                {
                  function: "reactant",
                  name: "adiA_mRNA",
                  type: "RNA",
                },
              ],
              description: "Translation of AdiA",
              name: "adiA_mRNA -> AdiA",
              number: 15,
              order: 0,
              pathwayComponents: "adiA_mRNA -> AdiA",
              type: "translation",
            },
            {
              components: [
                {
                  function: "catalyzer",
                  name: "AdiA",
                  type: "protein",
                },
                {
                  function: "product",
                  name: "CO2",
                  type: "simple_molecule",
                },
                {
                  function: "product",
                  name: "agmatine",
                  type: "simple_molecule",
                },
                {
                  function: "reactant",
                  name: "arginine",
                  type: "simple_molecule",
                },
              ],
              description: "Reaction transforming arginine into agmatine, CO2",
              name: "arginine -> agmatine + CO2",
              number: 16,
              order: 0,
              pathwayComponents: "arginine - AdiA -> agmatine + CO2",
              type: "state transition",
            },
          ],
          totalOfComponents: 25,
        },
      ],
    },
  };
