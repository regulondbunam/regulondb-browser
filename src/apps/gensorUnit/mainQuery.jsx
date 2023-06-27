/*
# Component (user guide)

# [MainQuery]
	
## Description  
[Description Details]
With this component we can consult the information of the gus stored in the
regulonDB database

## Category   
[Functional]  


## Usage 
[example: <MainQuery getData={} /> ]

## Props 

| Attribute | Type     | Default  | Description                                    |
| --------- | -------- | -------- | ---------------------------------------------- |
| getData   | Function | () => {} | Function that updates the information of the GUS|


## Exception

__Category: [Error, Warning or Message]__
[Description of the exception (if necessary)]

## License

MIT License

## Author 
	
RegulonDB Team: 
    Gabriel Alarcon Carranza <galarcon@ccg.unam.mx>

# Component (technical guide)

## Component Type 
[Simple Component]

## Dependencies
__WebServices from "../../components/webservices/WebServices"__
[With this dependency we can use a set of functions that allow us to query the regulonDB database]

# Functions description

## [formatData ]

__Description:__  
Format the response of the query sent to the regulonDB web service, so that it can be used by the GensorUnit component


__Usage:__

```javascript
formatData(data)
```

__Scope: __
[local]

__Input Parameter:__  
​__[data]:__ [JSON type object with GUS information]

*/

import WebServices from "../../components/webservices/WebServices"

export default function MainQuery(
    {getData = () => {}}
){
    //darle formato a la respuesta de consulta al formato que requiere el componente de GensorUnit
    function formatData(data){
        let /** array */formatData = [];
        data.data.forEach(gu => {
            formatData.push({
                "id": gu._id,
                "name":gu.gensorUnit.name,
                "groups":gu.gensorUnit.groups
            });         
        });
        getData(formatData)
    }

    return(
        <div>
            <WebServices datamart_name="getAllGUs" getData={(data)=>{formatData(data)}}  />
        </div>
    );
}

