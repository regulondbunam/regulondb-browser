/**

# Component (deployment use)

# Paragraph 
	
## Description  

[Component that shows a brief description of the overviews]

## Category   
	
Visual


## Usage 
'''
<Paragraph description={mainView.description} />
'''
## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| description          | string     | Undefined         | brief description of the overviews taken from the json    |
|           |      |         |             |


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



 * 
 */
  import PropTypes from 'prop-types'

  /**
 * Descripction of the overviews
 * @param {string} description - text show in paragraph 
 * @returns {ReactElement} 
 */
  export default function Paragraph({description}) {
      return(
          <div>
            <p dangerouslySetInnerHTML={{__html: description}} />
          </div>
      )
  }
  
  Paragraph.defaultProps = {
    description: ''
  };
  
  Paragraph.propTypes = {
    description: PropTypes.string
  }