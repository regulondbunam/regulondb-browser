import React, { Component } from 'react';

class CoverVideo extends Component {

  render() {

    const {
      width,
      height,
      url
    } = this.props;

    // Datos del Video
    // dopbox video dl.dropboxusercontent.com

    const item = [
      {
        id: 1,
        video: url,
        formato: 'video/mp4',
      }
    ];

    return (
      
      

      item.map(item => {

        // Es necesario colocar una 'key' a partir de la versión de React JS 16
        // colocamos el objeto 'id: 1' en <div key={ item.id }  

        return  <div key={ item.id }>
                  <video width={width} height={height}  autoPlay muted loop>
                    <source src={ item.video} type={ item.formato }/>
                  </video>
                </div>


      })


    )


  }

};

export default CoverVideo;

CoverVideo.defaultProps = {
  width: "100%",
  height: "",
  url: ""
}