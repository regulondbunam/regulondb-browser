import React, { useState, useEffect } from 'react'
import { Cover } from "../../../components/ui-components/ui_components";
import Drop from "./drop_crossref";

export const GeneTitle = ({ id_gene }) => {
    const [_state, set_state] = useState();
    const [_title, set_title] = useState("");
    const [_data, set_data] = useState();

    let ID_COVER = "cover_gene_context"
    useEffect(() => {
        const cover = document.getElementById(ID_COVER)
        if (cover) {
            cover.addEventListener('coverGene', function (e) {
                //console.log(`state`, e.detail)
                if (e.detail.state) {
                    set_state(e.detail.state)
                }
                if (e.detail.title) {
                    set_title(e.detail.title)
                }
                set_data(e.detail.data)
            }, false);
        }
    }, [ID_COVER])
    console.log(_data)
    if (_data) {
        //console.log(_data)
        const geneName = _data?.gene?.name
        let location = ""
        let propd = ""
        if (_data?.products) {
            try {
                _data?.products.forEach((product) => {
                    propd += ` ${product?.name}`
                    if (product?.cellularLocations) {
                        product.cellularLocations.map((es) => {
                            location += es;
                            return null;
                        });
                        //console.log("loc:", location);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
        let synonyms = undefined;
        if (_data?.gene?.synonyms) {
            try {
                synonyms = _data?.gene?.synonyms.map((synonym) => {
                    return `${synonym} `;
                });
            } catch (error) { }
        }
        let length = undefined;
        if (_data?.gene?.sequence) {
            try {
                let sg = _data?.gene?.sequence;
                length = sg.length;
            } catch (error) { }
        }
        let position = undefined;
        if (_data?.gene?.rightEndPosition) {
            try {
                let strand = "->";
                if (_data?.gene?.strand === "reverse") {
                    strand = "<-";
                }
                position = `${_data?.gene?.leftEndPosition} ${strand} ${_data?.gene?.rightEndPosition}`;
            } catch (error) { }
        }
        return (
            <div id={ID_COVER}>
                <Cover>
                    <table style={{ tableLayout: "fixed", width: "auto" }}>
                        <tbody>
                            <tr>
                                <td>Gene</td>
                                <td>Product</td>
                            </tr>
                            <tr>
                                <td>
                                    <h1
                                        assistentvalue={`${geneName} gene page...`}
                                        style={{ margin: "0" }}
                                        dangerouslySetInnerHTML={{
                                            __html: `${geneName}`
                                        }}
                                    ></h1>
                                </td>
                                <td>
                                    <h2
                                        assistentvalue={`${geneName} gene page...`}
                                        style={{ margin: "0" }}
                                        dangerouslySetInnerHTML={{
                                            __html: `${propd}`
                                        }}
                                    ></h2>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table style={{ tableLayout: "fixed", width: "auto" }}>
                        <tbody>
                            <tr>
                                <td>
                                    <table>
                                        <tbody>
                                            {synonyms ? (
                                                <tr>
                                                    <td style={{ fontWeight: "bold" }}>Synonyms:</td>
                                                    <td>{synonyms}</td>
                                                </tr>
                                            ) : (
                                                <tr></tr>
                                            )}
                                            {length ? (
                                                <tr>
                                                    <td style={{ fontWeight: "bold" }}>Length:</td>
                                                    <td>{length}bp</td>
                                                </tr>
                                            ) : (
                                                <tr></tr>
                                            )}
                                            {position ? (
                                                <tr>
                                                    <td style={{ fontWeight: "bold" }}>Position:</td>
                                                    <td>{position}</td>
                                                </tr>
                                            ) : (
                                                <tr></tr>
                                            )}
                                            {location ? (
                                                <tr>
                                                    <td style={{ fontWeight: "bold" }}>Location:</td>
                                                    <td>{location}</td>
                                                </tr>
                                            ) : (
                                                <tr></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </td>
                                <td>{Drop(id_gene, _data?.gene?.externalCrossReferences)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                </Cover>
            </div>
        )
    }
    //console.log(_isHome)
    return (
        <div id={ID_COVER}>
            <Cover id="component_cover_gene_01" state={_state}>
                <h1 id="h1_cover_gene_01" style={{ margin: "0px 0px 0px 0px" }} >{_title}</h1>
            </Cover>
        </div>
    )
}

export default GeneTitle

/**
 *
 */