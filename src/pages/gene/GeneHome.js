import React, { Component } from 'react';
import Cover from './ownComponents/Cover'
import Title from './ownComponents/TitleGene'
import { ValidateId } from '../../components/apollo/dataMarts/gene/Search'
import {
  useParams
} from "react-router-dom";

const GeneHome = () => {
  const idGene = useParams().id;
  const site = useParams().site;
  const section = useParams().section;
  //console.log(idGene, "/", site, "/", section)

  return <Home idGene={idGene} site={site} section={section} />
}

export default GeneHome;

class Home extends Component {
  constructor(props) {
    super(props);
    this.body = React.createRef();
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
      this.body.current.setData(this.props.idGene)
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
        <GenCover ref={this.genCover} />
        <Body ref={this.body} site={site} section={section} />
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
      id
    } = this.props
    const {
      data,
      status,
      genValid
    } = this.state
    let msg = ''
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
            return (<>{Title(geneName, id, products)}</>)
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
      default:
        break;
    }
    return (<>
      {Cover(msg, status)}
    </>)
  }
}

class Body extends Component {
  state = { id: null, status: 'sleep', genValid: false }
  
  setData = (id) => {
    this.setState({ id: id })
  }

  render() {
    const {
      id,
      status,
      genValid
    } = this.state

    switch (status) {
      case 'loading':
        return (
          <>Loading...</>
        )
      case 'done':
        if (genValid) {
          return (<h1>{id}</h1>)
        }
        break
      case 'sleep':
      default:
        return (<></>)
    }
  }
}


