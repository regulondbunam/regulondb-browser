import React, { Component } from 'react';
import Cover from './ownComponents/Cover'
import Title from './ownComponents/TitleGene'
import GeneTabs from './GeneTabs'
import { ValidateId } from '../../components/apollo/dataMarts/gene/Search'
import {
  useParams
} from "react-router-dom";

const GeneHome = () => {
  const idGene = useParams().id;
  const site = useParams().site;
  const section = useParams().section;
  //console.log(idGene, "/", site, "/", section)

  if(idGene === undefined){
    return(
      <>
      {
        Cover("Genes Information Page")
      }
      </>
    )
  }

  return <Home idGene={idGene} site={site} section={section} />
}

export default GeneHome;

class Home extends Component {
  constructor(props) {
    super(props);
    this.genCover = React.createRef();
  }

  _updateValidate = (genValid) => {
    this.genCover.current.setValidate(genValid)
  }
  _updateStatus = (status) => {
    this.genCover.current.setStatus(status)
  }

  _updateData = (data) => {
    if (data !== undefined || data !== {} || []) {
      this.genCover.current.setData(data)
    }

  }


  render() {

    const {
      idGene,
      site,
      section
    } = this.props

    return (
      <>
        <GenCover id={idGene} ref={this.genCover} site={site} section={section} />
        <ValidateId id={idGene}
          status={this._updateStatus}
          resoultsData={this._updateData}
          isValidate={this._updateValidate}
        />
      </>
    );
  }
}

class GenCover extends Component {
  state = { data: null, status: 'sleep', genValid: false }
  setData = (data) => {
    this.setState({ data: data })
  }
  setStatus = (status) => {
    this.setState({ status: status })
  }
  setValidate = (genValid) => {
    this.setState({ genValid: genValid })
  }
  render() {
    const {
      id,
      section,
      site
    } = this.props
    const {
      data,
      status,
      genValid
    } = this.state
    let msg = ''
    //console.log(status)
    switch (status) {
      case 'loading':
        msg = `Loading ${id} ID information, please wait`
        break;
      case 'error':
        msg = 'Sorry we have technical difficulties, please try again later'
        break
      case 'done':
        if (genValid && data != null) {
          try {
            const gwc = data[0].growthConditions
            const geneName = data[0].gene.name
            const products = data[0].products
            return (
            <>
            {Title(geneName, id, products)}
            <GeneTabs idGene={id} prodCount={products.length} gwcCount={gwc.length} section={section} site={site}/>
            </>
            )
          } catch (error) {
            msg = 'Sorry we have technical difficulties, please try again later'
            return (<>
              {Cover(msg, 'error')}
            </>)
          }
        } else {
          msg = `Sorry we couldn't find the identifier: ${id}`
          return <>{Cover(msg, 'error')}</>
        }
      case 'not found':
        msg = `Sorry, we could not find the ${id} identifier on the Genes site`
          return <>{Cover(msg, 'error')}</>
      default:
        break;
    }
    return (<>
      {Cover(msg, status)}
    </>)
  }
}


