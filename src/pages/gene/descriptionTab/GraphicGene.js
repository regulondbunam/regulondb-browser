import React, { useState } from 'react';
import Image from '../../components/ui-components/infoDisplay/media/Image'
import img from '../../../img/gene_context.png'
import imgZ from '../../../img/gene_zoom.png'
const GraphicGene = ({
    idGene
}) => {
    const [zoom, setZoom] = useState(false)


    return (
        <table>
            <thead>
                <tr>
                    <th>Graphic</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                    <div onClick={() => { setZoom(!zoom) }} style={{ cursor: "grab", width: "100%", textAlign: "center"  }}>
                {
                    zoom
                        ? <Image id={idGene} urlImage={imgZ} imgStyle={{ maxWidth: "100%", height: "120px" }} />
                        : <Image id={idGene} urlImage={img} imgStyle={{ maxWidth: "100%", height: "120px" }} />
                }

            </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default GraphicGene;