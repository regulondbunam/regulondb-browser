import React, { useState } from 'react';
import Image from '../../components/ui-components/infoDisplay/media/Image'
import img from '../../../img/gene_context.png'
import imgZ from '../../../img/gene_zoom.png'
import { PanZoom } from 'react-easy-panzoom'

const GraphicGene = ({
    idGene
}) => {
    const [zoom, setZoom] = useState(false)

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <div style={{ textAlign: "center" }}>
                            <PanZoom>
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
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}

export default GraphicGene;