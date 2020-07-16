import React, { useState, useRef } from 'react';
import Image from '../../components/ui-components/infoDisplay/media/Image'
import img from '../../../img/gene_context.png'
import imgZ from '../../../img/gene_zoom.png'
import { IconButton } from '../../components/ui-components/basicInput/Buttons'
import { PanZoom } from 'react-easy-panzoom'
import GetFile from '../../components/staticComponets/GetFile'
import Modal from '../../components/ui-components/infoDisplay/modal/Modal'

const urlFile = 'https://dl.dropboxusercontent.com/s/g0nas12g9yddrkr/images_context_help.html?dl=0'

const GraphicGene = ({
    idGene
}) => {
    let imge = useRef(null)
    const [zoom, setZoom] = useState(false)
    let iconZoom = '<<>>'
    if(zoom){
        iconZoom = '>><<'
    }
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <div style={{float: "right"}}>
                            <IconButton style={{ float: 'left' }} icon="add" onClick={() => {
                                imge.current.zoomIn(1)
                            }} />
                            <IconButton style={{ float: 'left' }} icon="fullscreen_exit" onClick={() => {
                                imge.current.reset()
                            }} />
                            <IconButton style={{ float: 'left' }} icon="remove" onClick={() => {
                                imge.current.zoomOut(1)
                            }} />
                            <IconButton style={{ float: 'left' }} iconStyle={{fontFamily: "monospace", fontSize: "14px", fontWeight: 'bold'}} icon={iconZoom} onClick={() => { setZoom(!zoom) }} />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div style={{ textAlign: "center", overflow: 'hidden' }}>
                            <PanZoom
                                ref={imge}
                                maxZoom={2}
                                disableKeyInteraction={true} disableDoubleClickZoom={true} disableScrollZoom={true}>

                                {
                                    zoom
                                        ? <Image id={idGene} urlImage={imgZ} imgStyle={{ maxWidth: "100%", height: "120px" }} />
                                        : <Image id={idGene} urlImage={img} imgStyle={{ maxWidth: "100%", height: "120px" }} />
                                }

                            </PanZoom>
                        </div>

                    </td>
                </tr>
                <tr>
                    <td>
                        <div style={{float: "right"}}>
                        <Modal title={"what is this diagram?"}><GetFile urlFile={urlFile} /></Modal>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}


export default GraphicGene;