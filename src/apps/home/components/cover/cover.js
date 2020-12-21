
import CoverVideo from './cover_video'
import CoverImg from './cover_img'
import Styles from './cover.module.css'

const HomeCover = ({
  children,
  coverType,
  source = "#000",
  color = "#000",
  opacity = 0.5
}) => {

  let displayed;

  switch (coverType) {
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
    <div className={Styles.coverSize}>
      <div className={Styles.coverComponent+" "+Styles.coverSize}>
      <div className={Styles.coverComponentBackground+" "+Styles.coverSize} style={{color: color}}>
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

function Video(videoUrl) {
  return (
    <CoverVideo url={videoUrl} />
  )
}
