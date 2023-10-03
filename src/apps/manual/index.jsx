/** 
# Component (user guide)

# Manual
	
## Description  
	
It allows users to navigate and access different sections of the manual using the URL and provides an interactive user experience.

## Category   
	
Visual 

## Live demo 
	
---

## Installation or Implementation
--

## Usage 
example: <Manual /> 

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception

__Category: Error__
This section pertains to error handling within the `downloadConf` function.

### Description
In the event of an error during the execution of the `downloadConf` function, it is categorized as an "Error." This error typically occurs when there is a problem with the network request (e.g., the requested URL is invalid, the server is unreachable, or the response is not in JSON format).


## License

MIT License

## Author 
	
RegulonDB Team: 


# Component (technical guide)

## Component Type 

Visual

## Dependencies

useParams: Extracts URL parameters in React components.
Link: Creates navigation links in React applications.
React: Library for building interactive user interfaces.
useEffect: React hook for side effects in functional components.
useState: React hook for adding state to functional components.
Button: UI component to create buttons.
Card: UI component to display organized information.
CardActions: Component inside Card to show related actions.
CardContent: Component inside Card to show main content.
CardMedia: Component inside Card to display images or media.
Grid: Layout component to create grid layouts.
Stack: Layout component to stack elements.
Box: Layout component to create flexible containers.
Typography: Component to style text.
Container: Design component to wrap content.
CircularProgress: Component to show a circular progress indicator.
TextField: Component for text input.
DataVerifier: Component or function related to data validation.
Site: Component related to the representation of a site or section.


## States
	
| Property | Value | Description                                                                                      |
| -------- | ----- | ------------------------------------------------------------------------------------------------ |
| rawConf  |       |  This state is a state variable that stores the data retrieved from an asynchronous HTTP request.|

## Hooks
|  Name   | Description                                                                                                                                                             |       Syntax                            | Additional Notes or References | 
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------ |
|useParams|This hook is used to extract the URL parameters, in particular, the site and section values of the URL.                                                                  |useParams()                              |                                |
|useState |the useState hook is used implicitly through the rawConf state, which is initialized by this hook. This allows the component to maintain and update the state of rawConf.|const [rawConf, setRawConf] = useState();|                                |

# Functions description

## downloadConf


__Description:__  
This function is responsible for asynchronously downloading a JSON configuration file from a specified URL and updating the rawConf state with the retrieved data or an error object if the request fails.


__Usage:__

```javascript
&downloadConf(setRawConf);
```

__Scope: __

This function is used within the Manual component to fetch configuration data for the "RegulonDB Manual" web application.


__Input Parameter:__  
setRawConf: A callback function that allows the function to update the rawConf state with the fetched data or an error object.



__Return:__  
​__[Type]:__ [Name]
No explicit return value, as it operates asynchronously. It updates the rawConf state via the setRawConf callback.


**/

import { useParams, Link } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
//import Stack from "@mui/material/Stack";
//import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
//import TextField from "@mui/material/TextField";
import { DataVerifier, Cover, AnchorNav } from "../../components/ui-components";
import Topic from "./topic";
//import Topic from "./topic";

/**
 *
 * @async
 * @param {function} setRawConf - A callback function to update the rawConf state.
 * @returns {void} - A promise that resolves when the download and update are complete.
 */
const downloadConf = async (setRawConf) => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/regulondbunam/RegulonDBManual/master/conf.json"
    );
    try {
      const jsonData = await response.json();
      setRawConf(jsonData);
    } catch (error) {
      console.error(error);
      setRawConf({
        error: {
          type: "fetch",
          log: error,
        },
      });
    }
  } catch (error) {
    console.error("fetch error", error);
    setRawConf({
      error: {
        type: "fetch",
        log: error,
      },
    });
  }
};

/**
 * Description placeholder
 *
 * @export
 * @returns {React.JSX}
 */
export default function Manual() {
  const { site, section } = useParams();
  const [rawConf, setRawConf] = useState();

  if (!rawConf) {
    downloadConf(setRawConf);
  }

  if (!rawConf) {
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <CircularProgress />
      </div>
    );
  }
  if (rawConf?.error) {
    return (
      <div>
        <h2>{rawConf.error.type + " "}error</h2>
        <p>{rawConf.error.log}</p>
      </div>
    );
  }
  /**
   * Description placeholder
   * @date 9/26/2023 - 8:24:57 AM
   *
   * @type {array}
   */
  let sites = DataVerifier.isValidArray(rawConf.sites) ? rawConf.sites : [];

  if (sites.length > 0 && section) {
    const _site = sites.find(s=>s._url ===site)
    if(_site){
      const _section = _site.sections.find(ss=>ss._url === section) 
      if(_section){
        return <Topic {..._section} />
      }
    }
  }

  return (
    <div>
      <Cover>
        <br />
        <h1>Manual topics</h1>
        <br />
      </Cover>
      <ManualNav sites={sites} site={site} />
    </div>
  );
}

function ManualNav({ sites = [], site }) {

  useEffect(()=>{
    const docSite = document.getElementById(site)
    if (docSite) {
      docSite.scrollIntoView()
    }
  },[site])

  const sections = useMemo(() => {
    let sections = sites.map((section, i) => {
      return {
        id: "section_" + i,
        label: section.title,
        title: section.title,
        component: (
          <div id={section._url}  style={{ margin: "0% 1% 1% 2%" }}>
            <Topics
              section={section}
              sections={section.sections}
              img={section.imgUrl}
            />
          </div>
        ),
      };
    });
    return sections;
  }, [sites]);
  return (
    <div>
      {
        sections.map(section=>(<div key={section._id} >{section.component}</div>))
      }
    </div>
  );
}

function Topics({ section, sections, img }) {
  if (!DataVerifier.isValidArray(sections)) {
    return null
  }
  return (
    <div>
      <h2>{section.title}</h2>
      <p>{section.description}</p>
      <Container sx={{ py: 2 }} maxWidth="md">
      <Grid container spacing={4}>
        {sections.map((site, i) => (
          <Grid item key={"site_n_" + i} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {img && (
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "10%",
                    }}
                    image={img}
                  />
                )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {site.title}
                </Typography>
                <Typography variant="body2">{site.description}</Typography>
              </CardContent>
              <CardActions>
                <Link to={"/manual/" + section._url+"/"+site._url}>
                  <Button size="small">View</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  );
}
