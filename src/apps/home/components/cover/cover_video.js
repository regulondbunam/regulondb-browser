import React, { Component } from 'react';

class CoverVideo extends Component {



    componentDidMount() {

        function loop(){
            let video = document.getElementById('video');
            if(video){
                ctx.drawImage(video, 0, 0, 640, 360, 0, 0, 640, 360);
                setTimeout(loop, 1000 / 30);
            }
        }
        let canvas = document.getElementById('cropCvs');
        if(canvas){
            var ctx = canvas.getContext('2d');
            loop();
        }
    }

    render() {

    const {
      height,
    } = this.props;

    const url = `${window.location.origin}/media/videos/ecoli.mp4`

        const item = {
            id: 1,
            video: url,
            formato: 'video/mp4',
        };

        return (
            <div key={ item.id }>
                <video
                    id="video"
                    height="auto"
                    width="100%"
                    autoPlay muted loop
                    style={{display: "none"}}
                >
                    <source src={ item.video} type={ item.formato }/>
                </video>
                <canvas
                    id="cropCvs"
                    height="360"
                    width="640"
                    style={{width: "100%", height: height, border: "1px solid black"}}>
                </canvas>
            </div>
        )
  }

};

export default CoverVideo;

CoverVideo.defaultProps = {
  width: "100%",
  height: "",
  url: ""
}