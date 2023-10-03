/**
# Component (user guide)

# TestComponents
	
## Description  
	
It is used to obtain and display data about a specific gene using the Gene component.

## Category   
	
 Functional 

## Live demo 
--

## Installation or Implementation
--

## Usage 
	
example: <TestComponents/> 

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
Gene: Gene is a React component that takes several properties and renders information about a gene.	
useGenesById: is a custom hook used to perform GraphQL queries related to genes in an application.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |

 
**/
import { Gene } from '../../components/datamartSchema/';
import { useGetGenesBy } from '../../components/webservices/gene';



/**
 * Description placeholder
 *
 * @export
 * @returns {HTMLElement}
 */
export function TestComponents() {

    const { geneData } = useGetGenesBy({_id: "RDBECOLIGNC00651"})
    // console.log(geneData?.gene);
    return (
        <div>
            <h1>Components in RegulonDB</h1>
            <article>
                <h2>SchemaComponent</h2>
               {geneData &&(
                 <Gene {...geneData.gene} allCitations={geneData.allCitations} />
               )}
            </article>

        </div>
    )
}

