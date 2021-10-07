
import CoverVideo from './cover_video'
import CoverImg from './cover_img'
import Styles from './cover.module.css'
import {useEffect, useState} from "react";

const HomeCover = ({
    conf,
  children,
  coverType,
  source = "#000",
  color = "#000",
  opacity = 0.25
}) => {

    const [_height,set_heigth] = useState("0px")

    useEffect(()=>{
        let cv = document.getElementById("cover_video_01")
        if(_height === "0px" && cv){
            set_heigth(`${cv.clientHeight}px`)
        }
    },[set_heigth,_height])

  let displayed;

  switch (coverType) {
    case 'video':
      displayed = Color(source)
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
    <div className={Styles.coverSize}>
      <div className={Styles.coverComponent+" "+Styles.coverSize}>
      <div id={"cover_video_01"} className={Styles.coverComponentBackground+" "+Styles.coverSize} style={{color: color}}>
        {
          displayed
        }
      </div>
      <div className={Styles.coverComponentGlass+" "+Styles.coverSize} style={{ opacity: opacity }} />
      <div className={Styles.coverComponentContent}>
        {children}
      </div>
    </div>
    </div>
  )
}

export default HomeCover;


function Image(url) {
  return (
    <CoverImg urlImage={url} />
  )
}

function Color(color) {
  return(
    <div style={{height: "45vh", width: "100%", backgroundColor: color}}>.</div>
  )
}

// eslint-disable-next-line no-unused-vars
function Video(videoUrl, height) {
  return (
    <CoverVideo url={videoUrl} height={height} />
  )
}
