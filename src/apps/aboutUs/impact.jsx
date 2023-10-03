// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const YEARS = [
  1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
  2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
];

const citationsData = [
  {
    label: "1998 (Operons, promoters, TFBSs, object references)",
    data: [
      4, 10, 14, 17, 20, 24, 30, 35, 46, 52, 64, 76, 83, 88, 97, 97, 102, 105,
      114, 120, 125, 130, 133, 137, 139, 139,
    ],
    backgroundColor: "rgb(5, 50, 255)"
  },
  {
    label: "1999 (Tus)",
    data: [
      0, 4, 11, 12, 15, 15, 17, 17, 18, 19, 20, 22, 24, 25, 27, 27, 28, 29, 30,
      30, 30, 30, 30, 30, 30, 31,
    ],
    backgroundColor: "rgb(255, 38, 0)"
  },
  {
    label: "2000 (RBS, terminators)",
    data: [
      0, 0, 3, 14, 21, 29, 30, 33, 36, 38, 38, 41, 41, 42, 46, 46, 46, 46, 47,
      47, 48, 49, 49, 49, 49, 49,
    ],
    backgroundColor: "rgb(255, 252, 121)"
  },
  {
    label: "2001 (Active & Inactive conformations of TFs)",
    data: [
      0, 0, 0, 6, 26, 58, 93, 114, 125, 139, 143, 152, 153, 154, 162, 165, 169,
      170, 173, 173, 174, 174, 175, 177, 177, 177,
    ],
    backgroundColor: "rgb(55, 156, 40)"
  },
  {
    label: "2004 (Growth Conditions. Predictions: Tus, promoters, TFBSs)",
    data: [
      0, 0, 0, 0, 0, 0, 16, 71, 109, 132, 144, 158, 167, 170, 175, 180, 182,
      182, 183, 184, 186, 187, 188, 189, 190, 191,
    ],
    backgroundColor: "rgb(172, 76, 68)"
  },
  {
    label: "2006. (Object evidence, transcriptional regulatory network)",
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 16, 69, 124, 163, 181, 197, 210, 218, 227, 234,
      242, 244, 247, 252, 255, 264, 264, 264,
    ],
    backgroundColor: "rgb(217, 68, 221)"
  },
  {
    label: "2008 (Riboswitches, attenuators, small RNAs and their targets)",
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 74, 151, 219, 263, 296, 306, 322, 337,
      348, 354, 356, 361, 361, 365, 367,
    ],
    backgroundColor: "rgb(34, 43, 15)"
  },
  {
    label: "2011 (Gus)",
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 85, 147, 179, 200, 218, 234,
      242, 253, 258, 263, 270, 272,
    ],
    backgroundColor: "rgb(0, 253, 255)"
  },
  {
    label: "2013 (Omics and evolutionary)",
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 84, 151, 216, 252, 278,
      293, 300, 313, 317, 319,
    ],
    backgroundColor: "rgb(247, 135, 3)"
  },
  {
    label: "2016 (HT and coexpression)",
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 50, 128, 197,
      246, 279, 306, 311,
    ],
    backgroundColor: "rgb(132, 25, 238)"
  },
  {
    label:
      "2018 high-throughput-generated binding data into RegulonDB version 10.0 ",
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 15, 25,
      28, 29,
    ],
    backgroundColor: "rgb(255, 141, 224)"
  },
  {
    label:
      "2019 RegulonDB v 10.5: tackling challenges to unify classic and high throughput knowledge of gene regulation in E. coli K-12 ",
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 53, 114,
      173, 181,
    ],
    backgroundColor: "#6E6E8D"
  },
  {
    label:
      "RegulonDB 11.0: Comprehensive high-throughput datasets on transcriptional regulation in Escherichia coli K-12 ",
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
      8,
    ],
    backgroundColor: "#12A9A1"
  },
];

let _data = {
    labels: YEARS,
    datasets: citationsData
}


const OPTIONS = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export default function ImpactRDB() {
  return (
    <div id="myChart">
        <p class="NormalText" align="justify">
        RegulonDB is the gold standard resource on regulation of transcription initiation that integrates the scattered scientific 
        knowledge of the best-characterized organism, the bacterium Escherichia coli K-12. Its electronic format enables 
        researchers to compare their results with the legacy of previous knowledge and supports implementation of bioinformatics 
        tools and model building.
        <br/><br/>
        RegulonDB plays a central role in the development and testing of novel approaches of gene regulation in bioinformatics, 
        comparative genomics and systems biology, and is the model to inspire similar approaches and studies for any other organism, 
        including pathogenic bacteria ((Shen-Orr et al., 2002), (Barabasi and Oltvai, 2004), (Isalan et al., 2008) ). Evidence of 
        its usefulness is the more than 1200 citations in published articles, in addition to the many citations to the EcoCyc 
        database, which incorporates our curation work.
        </p>
      <Bar id={"12312"} data={_data} options={OPTIONS}></Bar>
    </div>
  );
}
