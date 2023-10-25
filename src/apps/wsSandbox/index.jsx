/**
# Component (user guide)

# EmbeddedSandbox
	
## Description  
It is used to create an Apollo Client sandbox environment and configure it to interact with a specific GraphQL server, either locally or remotely, depending on the application execution environment.

## Category   
Functional

## Live demo 
--

## Installation or Implementation
--

## Usage 
	
[example: <EmbeddedSandbox /> ]

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

Driver


## Dependencies
ApolloSandbox: it is used in applications that make use of Apollo Client to perform GraphQL requests. It provides a controlled and secure place to define and execute GraphQL queries, as well as to manage the data cache and Apollo Client state.


## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |


**/

import { ApolloSandbox } from '@apollo/sandbox/react';
  

/**
 * Description placeholder
 *
 * @export
 * @returns {React.JSX}
 */
export function EmbeddedSandbox() {
  
    /**
     * Description placeholder
     *
     * @type {string}
     */
    let url = ""
    
    /**
     * Description placeholder
     *
     * @type {object}
     */
    const host = window.location.hostname
    if (host==="localhost") {
        url = process.env.REACT_APP_WEB_SERVICE_URL
    }else{
        url=host+"/graphql"
    }

  return (
    <div style={{width: "100%", height: "100vh", display: "grid"}} >
      <ApolloSandbox
      initialEndpoint={url}
    />
    </div>
        
  );
}