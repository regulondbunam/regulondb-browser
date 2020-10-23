import React, { useState,  } from 'react';
import Querys from '../../../components/apollo/querys/GeneQuerys'
import { useQuery } from '@apollo/react-hooks';
import { IconButton } from '../../../components/ui-components/basicInput/Buttons'
import Canvas from '../../../components/miniDTT/Canvas'
//import { PanZoom } from 'react-easy-panzoom'
import GetFile from '../../../components/staticComponets/GetFile'
import Modal from '../../../components/ui-components/infoDisplay/modal/Modal'

//const urlFile = 'https://dl.dropboxusercontent.com/s/g0nas12g9yddrkr/images_context_help.html?dl=0'
const urlFile = ''
const GraphicGene = ({
    idGene
}) => {
    const query = new Querys(idGene)
    const { data, loading, error } = useQuery(query.queryGeneDrawInfo(idGene))
    const [zoom, setZoom] = useState(false)
    const idElement = 'drawPlace01'
    let iconZoom = '<<>>'
    if (zoom) {
        iconZoom = '>><<'
    }
    return (
        <table>
            <thead>
                <tr>
                    <td></td>
                    <th>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                            <div>
                                <IconButton style={{ float: 'left' }} icon="add" onClick={() => {
                                    //imge.current.zoomIn(1)
                                }} />
                                <IconButton style={{ float: 'left' }} icon="fullscreen_exit" onClick={() => {
                                  //  imge.current.reset()
                                }} />
                                <IconButton style={{ float: 'left' }} iconStyle={{ fontFamily: "monospace", fontSize: "14px", fontWeight: 'bold' }} icon={iconZoom} onClick={() => { setZoom(!zoom) }} />
                                <IconButton style={{ float: 'left' }} icon="remove" onClick={() => {
                                    //imge.current.zoomOut(1)
                                }} />
                            </div>
                        </div>
                    </th>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan="3">
                        <div id={idElement} style={{border:'1px solid black', textAlign: "center", overflow: 'hidden'}}>
                            {
                                loadDraw(data,loading,error,idElement,`geneDraw${idGene}`)
                            }
                        </div>

                    </td>
                </tr>
                <tr>
                    <td colSpan="3">
                        <div style={{ float: "right" }}>
                            <Modal title={"what is this diagram?"}><GetFile urlFile={urlFile} /></Modal>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default GraphicGene;

function loadDraw(data,loading,error,idElement,idCanvas){
    if(loading){
        return <>Loading...</>
    }
    if(error){
        return <>Error</>
    }
    try {
        const geneticElemets = data.getGenesBy.data
        //console.log(geneticElemets)
        return <Canvas geneticElements={geneticElemets} idElement={idElement} idCanvas={idCanvas} />
    } catch (error) {
        console.log(error)
        return <>erro to draw</>
    }
}

/**
 * <PanZoom
                                ref={imge}
                                maxZoom={2}
                                disableKeyInteraction={true} disableDoubleClickZoom={true} disableScrollZoom={true}>

                                {
                                    zoom
                                        ? <Image imgTitle="DTT-DATA" imgAlt="Context Gene" id={idGene} urlImage={imgZ} imgStyle={{ maxWidth: "100%", height: "120px" }} />
                                        : <Image imgTitle="DTT-DATA" imgAlt="Context Gene" id={idGene} urlImage={img} imgStyle={{ maxWidth: "100%", height: "120px" }} />
                                }

                            </PanZoom>
 */