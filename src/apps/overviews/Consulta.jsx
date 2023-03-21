/**

# Component (deployment use)

# Consulta
	
## Description  

[Consult the data of the overviews and the state]

## Category   
	
Estructural

## Usage 
'''
  <Consulta 
                getOverviewsData={updateOverviesData}
                getState={updateOverviewsState}
            />
'''
## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|getOverviewsData           | Function     |() => {}  | Object that returns the data of the overviews            |
| getState          |      |  Function    |     () => {}    | state of the query to the web service "loading" => it is loading, "error" => there is an error, "done" => the query is ready

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

    Simple Component
  [Simple Component,Stateful Component,An Application]

## Dependencies

'''
import PropTypes from 'prop-types'
import WebServices from '../componets/webservices/WebServices'
'''

 * 
 */

import WebServices from '../../components/webservices/WebServices'
import PropTypes from 'prop-types'

/**
 * Consult the data of the overviews and the state
 * @param {function} getOverviewsData -  returns the data of the overviews
 * @param {function} getState - used to update the state
 * @returns {ReactElement}
 */
export default function Consulta({
    getOverviewsData = () => {},
    getState = () => {},
}) {
    return(
        <div>
            <WebServices datamart_name={"getAllObjectInfo"}
                getData={(overviews)=>{
                    getOverviewsData(overviews.data);
                }}
                getState={(state)=>{
                    getState(state);
                }}
            />
        </div>
    )
}

Consulta.propTypes = {
    getOverviewsData: PropTypes.func,
    getState: PropTypes.func
  }

Consulta.defaultProps = {
    getOverviewsData: '() => {}',
    getState: '() => {}'
}