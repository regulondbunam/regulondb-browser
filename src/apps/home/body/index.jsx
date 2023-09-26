import React from "react";
import imgDataset from "./media/datasetsExp.png"
import imgDataset1 from "./media/datasetsExp1.png"
import imgDataset2 from "./media/datasetsExp2.png"
import imgDataset3 from "./media/datasetsExp3.png"
import Grid from "@mui/material/Grid";
import { ReleaseCard } from "./releaseCard";
import { SummaryCard } from "./summary";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from '@mui/material/CardMedia';
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const GRID_CONTENT = [
  {
    id: "High_Throughput",
    xs: 3,
    section: "Collection",
    title: "High Throughput",
    description: "",
    url: "/ht",
    imgUrl: imgDataset
  },
  {
    id: "gensorUnit",
    xs: 3,
    section: "Browser",
    title: "Gensor Unit",
    description: "",
    url: "/gu",
    imgUrl: imgDataset1
  },
  {
    id: "coexpression",
    xs: 3,
    section: "Collection",
    title: "Gene Coexpression",
    description: "",
    url: "/coexpression",
    imgUrl: imgDataset2
  },
  {
    id: "DTT",
    xs: 3,
    section: "RegulonDB Tool",
    title: "Drawing Traces Tool",
    description: "",
    url: "/dtt",
    imgUrl: imgDataset3
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
        <Stack direction="row" spacing={{ xs: 3, sm: 5 }} useFlexGap flexWrap="wrap" >
            <ReleaseCard />
            <SummaryCard />
        </Stack>
        <br />
      <Grid container spacing={2}>
        {GRID_CONTENT.map((card, index) => (
          <Grid item xs={card.xs} key={"card_" + index + "_" + card.id}>
            <Card sx={{ minWidth: 275 }} elevation={3} >
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
                <Typography variant="body2">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={card.url} >
                <Button color="secondary" size="small">let's go!</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
