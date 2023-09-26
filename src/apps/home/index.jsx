/**
# Component (user guide)

# Home
	
## Description  
The Home component is a React functional component that represents the home page of our application. It consists of a cover, body content, and displays a version number from a configuration file.


## Category   
Visual

## Live demo 
--

## Installation or Implementation
--

## Usage 
	
example: <Home /> 

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team: 


# Component (technical guide)

## Component Type 
Visual

## Dependencies
Cover: it represents the cover or header of some part of the application. The specific functionality of this component will depend on its implementation in the 'cover' file.
Body: it represents the main section or central content of a page or screen.
conf: it contains configuration information related to your application's home page, such as version, colors, default text, or any other data you need to customize the home page.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |


**/
import { Cover } from './cover';
import { Body } from './body';
import conf from './conf/home.conf.json'


/**
 * Description placeholder
 *
 * @returns {HTMLElement}
 */
const Home = () => {

    return (
        <div>
            <Cover />
            <br />
            <Body />
            <div>
                <p style={{ color: "white" }} >
                    {conf.version}
                </p>
            </div>
        </div>
    );
}

export default Home;