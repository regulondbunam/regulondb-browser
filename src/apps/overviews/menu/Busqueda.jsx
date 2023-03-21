/**

# Component (deployment use)

# Busqueda
	
## Description  

[It is used to search the description of the graphs]

## Category   
	
Functional

## Usage 
'''
    let overviewsFiltered = Busqueda(inputKeyword.value, this.props.overviewsData);
'''
## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| keyword   | String     |  undefined       | keyword to search a description       |
|   overviewsData         | Object     |  undefined       | Object that contains the information of Overviews coming from the web service  

## License

MIT License

## Author 
	
RegulonDB Team: 
[
  Elizabeth Ochoa Praxedis  <elizabethochoap23@gmail.com>
  Gabriel Alarcon Carranza  <galarcon@ccg.unam.mx>
]

# Component (development use)

## Component Type 

    function
  [Simple Component,Stateful Component,An Application]

 * 
 */

export default function Busqueda(keyword, overviewsData) {
      const regex = new RegExp(keyword.toLowerCase);
      return overviewsData.filter(overview => regex.test(overview.graph.toLowerCase()))
}