import React from "react";
import imgDataset from "./media/datasetsExp.png";
import imgDataset1 from "./media/datasetsExp1.png";
import imgDataset2 from "./media/datasetsExp2.png";
import imgDataset3 from "./media/datasetsExp3.png";
import Grid from "@mui/material/Grid";
import { ReleaseCard } from "./releaseCard";
import { SummaryCard } from "./summary";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const GRID_CONTENT = [
  {
    id: "ligth_regulonDB",
    xs: 3,
    section: "tool",
    title: "RegulonDB mirror sites ",
    description: `Our RegulonDB mirror sites in the cities of Cuernavaca Morelos and Querétaro. Additionally, you have the option to download and install a local instance of RegulonDB application on your computer.`,
    links: [
      {
        url: "https://regulondb.liigh.unam.mx",
        label: "RegulonDB Liigh UNAM",
      },
      {
        url: "https://testregulondb.ccg.unam.mx/",
        label: "RegulonDB CCG UNAM",
      },
      {
        url: "/manual/apiSoftware/docker",
        label: "RegulonDB Docker (local instance)"
      }
    ],
    imgUrl: imgDataset3,
  },
  {
    id: "High_Throughput",
    xs: 3,
    section: "HT Dataset Collection",
    title: "High Throughput",
    description: `Genomics has set the basis for a variety of methodologies that produce high-throughput datasets identifying the different players that define gene regulation, particularly regulation of transcription initiation and operon organization. 
    We report several collections of HT datasets that hold distinct types of objects (genomic features, TF binding sites, gene expression profiles) from distinct types of HT experiments (RNA-seq, ChIP-seq, gSELEX, DAP-seq, ChIP-exo). `,
    url: "/ht",
    imgUrl: imgDataset,
  },
  {
    id: "GENSOR Unit",
    xs: 3,
    section: "Browser",
    title: "GENSOR Unit (GUs)",
    description: `The ability of a cell to respond to changes inside the cell or in the environment initiates when the new signal or stimulus is sensed and transmitted through a series of molecular concatenated reactions, called signal transduction or transduction pathways. These events bring into action genetic switches that modify gene expression to produce the adequate response to the cell. We call these processes genetic Sensory Response Units, or Gensor Unit.`,
    url: "/gu",
    imgUrl: imgDataset1,
  },
  {
    id: "coexpression",
    xs: 3,
    section: "Dataset and Tool",
    title: "Gene Coexpression",
    description: `One of the extensive uses of HT technologies is for the development of global expression profiles. As mentioned before, dedicated databases with information on E. coli include COLOMBOS.
    To quantify coexpression for all combinations of gene pairs, we implemented a rank-based approach, using data available in COLOMBOS version 2.0, which contains expression profiles of 2470 different, contrasting conditions.`,
    url: "/coexpression",
    imgUrl: imgDataset2,
  },
  {
    id: "DTT",
    xs: 3,
    section: "Tool",
    title: "Drawing Traces Tool (DTT)",
    description: `Genetic elements drawing tool, utilizing information from RegulonDB or provided by the user. Features such as genes, promoters, operons, DNA binding sites, and any other genetic element have been designed for accurate representation.`,
    url: "/dtt",
    imgUrl: imgDataset3,
  },
  /*
  {
    id: "",
    xs: 6,
    section: "",
    title: "",
    description: "",
    url: "",
  },
  */
];

export function Body() {
  return (
    <div style={{ margin: "10px 5% 10px 5%" }}>
      <Stack
        direction="row"
        spacing={{ xs: 3, sm: 5 }}
        useFlexGap
        flexWrap="wrap"
      >
        <ReleaseCard />
        <SummaryCard />
      </Stack>
      <br />
      <Grid container spacing={2}>
        {GRID_CONTENT.map((card, index) => (
          <Grid item xs={card.xs} key={"card_" + index + "_" + card.id}>
            <Card sx={{ minWidth: 275, minHeight: 450 }} elevation={3}>
              {card?.imgUrl && (
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "10.25%",
                  }}
                  image={card.imgUrl}
                />
              )}
              <CardContent>
                <Typography
                  sx={{ fontSize: 12 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {card.section}
                </Typography>
                <Typography variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2">{card.description}</Typography>
              </CardContent>
              <CardActions>
                {card.url && (
                  <Link to={card.url}>
                    <Button color="secondary" size="small">
                      let's go!
                    </Button>
                  </Link>
                )}
                {card.links && (
                  <div>
                    {card.links.map((link) => (
                      <div key={link.url}>
                        <Link key={link.url} to={link.url}>
                          <Button color="secondary" size="small">
                            {link.label}
                          </Button>
                        </Link>
                        <br />
                      </div>
                    ))}
                  </div>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
