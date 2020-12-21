import React, { Component } from 'react';


export default class CoverImg extends Component {

  render() {

    const {
      urlImage,
      width,
      height
    } = this.props

    // Datos que debe renderizar la imagen

    const item = [
      {
        id: 1,
        img: urlImage,
        class: 'img-fluid',
        alt: '',
        title: '',
        target: '_blank',
        link: ''
      }
    ];

    return (

      item.map(item => {

        // Es necesario colocar una 'key' a partir de la versión de React JS 16
        // colocamos el objeto 'id: 1' en <div key={ item.id } 

        return <a key={item.id} href={item.link} target={item.target}>
          <img width={width} height={height} className={item.class} src={item.img} alt={item.alt} title={item.title} />
        </a>

      })

    )


  }

};

CoverImg.defultProps = {
  width: "100%",
  height: "",
  urlImage: ""
}
