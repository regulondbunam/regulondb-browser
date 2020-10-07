import React from 'react';
import unamLogo from '../../resources/image/layout/footer/UNAM.png'
import conacytLogo from '../../resources/image/layout/footer/CONACYT.png'
import nihLogo from '../../resources/image/layout/footer/NIH_Logo.png'
import ccgLogo from '../../resources/image/layout/footer/CCG_Logo.png'
import Image from '../ui-components/infoDisplay/media/Image'


const imgs = [unamLogo, ccgLogo, nihLogo, conacytLogo]

const Footer = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <table>
                            <tbody>
                                <tr>
                                        {
                                            imgs.map((image, id) => {
                                                return (
                                                    <td key={id} style={{ verticalAlign: 'middle', borderRight: '1px solid #D5D5D7' }}>
                                                        <Image id={`footherID-${id}`} imgTitle={`imgTitle-${id}`} imgAlt={`image.Alt${id}`} urlImage={image} imgStyle={{ maxWidth: "159px", maxHeight: "32px" }} />
                                                    </td>
                                                )
                                            })
                                        }
                                    <td>
                                    </td>
                                    <td style={{ textAlign: 'right', color: '#666666' }}>
                                        <a href="/TermsConditions">How to cite</a>
                                        <a href="/TermsConditions" style={{ paddingLeft: "10px" }}>Terms and conditions</a>
                                        <a href="/Contact" style={{ paddingLeft: "10px" }} >Contact US</a>
                                        <a href="/Funding" style={{ paddingLeft: "10px" }} >Funding</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '12px',marginLeft: '10%', marginRight: '10%'  }}>
                            ©1998-2020, CCG/UNAM All Rights Reserved. RegulonDB is free for academic/noncommercial use.
                            RegulonDB 10.7, 05/04/2020. Our curation knowledge is currently mapped to the GenBank Reference Sequence for E. coli K12.
                            Version NC_000913.3 GI:556503834. Send your comments to the RegulonDB Team HERE
                                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <br/>
                    </td>
                </tr>
            </tbody>
        </table>

    );
}

/*
<div>
            <br />
            <div style={{ borderTop: "5px solid var(--color-blue1)", width: "100%" }} />
            <div>

            </div>
            <div style={StyleSide}>
                <br/>
                
            </div>
            <div>

            </div>
        </div>
*/


export default Footer;