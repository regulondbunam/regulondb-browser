import React, { Component } from 'react';
import CoverVideo from './CoverVideo'
import CoverImg from './CoverImg'
import Styles from './Cover.module.css'

export default class Cover extends Component {

  render() {

    const {
      coverType,
      //links,
      source,
      opacity,
      title,
      colorTitle,
    } = this.props

    let displayed

    switch(coverType){
      case 'video':
        displayed = Video(source)
        break
      case 'img':
      case 'image':
      case 'imagen':
        displayed = Image(source)
        break
      default:
        displayed = Color(source)
              
    }
    
    return (
      <div className={Styles.coverComponent}>
        <div className={Styles.coverComponentGlass} style={{opacity: opacity}} />
        <div className={Styles.coverComponentContent}>
        <h1 className={Styles.coverTitle}>{title}</h1>
          {this.props.children}
        </div>
        <div className={Styles.coverComponentBackground}>
          {
            displayed
          }
        </div>
      </div>

    )


  }

}


function Image(url){
  return(
    <CoverImg urlImage={url}/>
  )
}

function Color(color){
  console.log(color)
}

function Video(videoUrl){
  return (
    <CoverVideo url={videoUrl}/>
  )
}


Cover.defaultProps = {
  coverType: "Color",
  links: [],
  opacity: 0.6,
  source: '#000000',
  title: "Cover Title",
  colorTitle: "#ffffff"
}
