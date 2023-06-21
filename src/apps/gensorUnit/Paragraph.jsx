/*
# Component (user guide)

#Paragraph
	
## Description  
	
Receives a string as a parameter and returns a div with a paragraph with
the string entered

## Category   
	
[Visual]  


## Usage 
	
[example:<Paragraph  description={""} />]

## Props 

| Attribute   | Type       | Default  | Description                     |
| ---------   | ----       | -------  | --------------------------------|
| description |   String   |    ""    |It is the string shown in the    |
|             |            |          | paragraph        |


## Exception

__Category: [Error, Warning or Message]__
[Description of the exception (if necessary)]

## License

MIT License

## Author 
	
RegulonDB Team: 
    Francisco Mendez Hernandez <jklmopkrst@gmail.com>

# Component (technical guide)

## Component Type 
[Simple Component]

## Dependencies
__paragraph.module.css__
[It is the style sheet of this component]

## States
	
|   State   | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |
	


*/
/*
import styles from "./paragraph.module.css";
import PropTypes from "prop-types";

export default function Paragraph({ description }) {
  let paragraph = description.split("\n");
  console.log(paragraph);
  console.log(description);
  return (
    <div className={styles.paragraphs}>
      {paragraph.map((paragraph) => {
        return paragraph != "" ? (
          <p className={styles.paragraph}>{paragraph}</p>
        ) : null;
      })}
    </div>
  );
}
*/

import styles from "./paragraph.module.css";
import PropTypes from "prop-types";

export default function Paragraph({ description }) {
  return (
    <div className={styles.paragraphs}>
      <p
        className={styles.paragraph}
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
    </div>
  );
}

// Define el tipo de dato para las props
Paragraph.propTypes = {
  description: PropTypes.string,
};
// define los default values para las props
Paragraph.defaultProps = {
  description: " ",
};
