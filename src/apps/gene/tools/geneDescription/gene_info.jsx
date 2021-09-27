import React from 'react'
import { Link } from 'react-router-dom';
import { Modal } from "../../../../components/ui-components/ui_components";
import Sequence from "../../../../components/ui-components/web/components/sequence/Sequence";
import { ParagraphCitations } from '../../../../components/citations/citations';
import {CitationsNote} from '../../../../components/citations/citations_note'
import { CitationCONTEXT } from '../../../../components/citations/citations_provider';

export default function GeneInfo({ gene }) {
    let size = gene?.rightEndPosition - gene?.leftEndPosition;
    return (
        <table className="table_auto table_content" style={{ paddingLeft: '5%' }}>
            <tbody>
                <tr>
                    <td style={{ fontWeight: "bold" }}>Name:</td>
                    <td>{gene?.name}</td>
                </tr>
                {
                    gene?.synonyms
                        ? <tr>
                            <td style={{ fontWeight: "bold" }}>Synonyms</td>
                            <td>
                                {
                                    gene?.synonyms.map((s) => {
                                        return s
                                    }).join(", ")
                                }
                            </td>
                        </tr>
                        : null
                }
                <tr>
                    <td style={{ fontWeight: "bold" }}>Bnumber:</td>
                    <td>{gene?.bnumber}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: "bold" }}>Position:</td>
                    <td>{gene?.leftEndPosition}
                        {
                            gene?.strand === "reverse"
                                ? <i class='bx bx-left-arrow-alt' ></i>
                                : <i class='bx bx-right-arrow-alt' ></i>
                        }
                        {gene?.rightEndPosition}
                    </td>
                </tr>
                <tr>
                    <td style={{ fontWeight: "bold" }}>Size:</td>
                    <td>{size}bp</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: "bold" }}>Strand:</td>
                    <td>{gene?.strand}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: "bold" }}>Sequence:</td>
                    {sequenceGene(
                        gene?.name, gene?.sequence
                    )}
                </tr>
                <tr>
                    <td style={{ fontWeight: "bold" }}>gc content:</td>
                    <td>{gene?.gcContent}%</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: "bold" }}>Centisome Position:</td>
                    <td>{gene?.centisomePosition}</td>
                </tr>
                {
                    gene?.type
                        ? <tr>
                            <td style={{ fontWeight: "bold" }}>Type</td>
                            <td>{gene?.type}</td>
                        </tr>
                        : null
                }
            </tbody>
            {
                gene?.note
                    ? <>
                        <p className="p_accent">Note:</p>
                        <p dangerouslySetInnerHTML={{
                            __html: CitationsNote(CitationCONTEXT,gene?.note)
                        }} />
                    </>
                    : null
            }
            {
                gene?.multifunTerms
                    ? <div>
                        <p className="p_accent">Multifun:</p>
                        {
                            gene?.multifunTerms.map(m => {
                                return (
                                    <div key={`multifun-data-${m.id}`}>
                                        <Link to={`/multifun/${m.id}`}>{`${m.label}: ${m.name}`}</Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : null
            }
            {
                gene?.citations
                    ? <div>
                        <p className="p_accent">Citations:</p>
                        <ParagraphCitations
                            CitationCONTEXT={CitationCONTEXT}
                            citations={gene?.citations}
                        />
                    </div>
                    : null
            }
        </table>
    )
}


function sequenceGene(gene, sequence) {
    return (
        <td className="sequence">
            <Modal
                className="aBase"
                title={"Fasta Format"}
                info={Sequence(
                    "gene",
                    sequence,
                    "fasta",
                    `${gene} gene sequence`,
                    true
                )}
            ></Modal>
            <Modal
                className="aBase"
                title={"genbank Format"}
                info={Sequence(
                    "gene",
                    sequence,
                    "genbank",
                    `${gene} gene sequence`,
                    true
                )}
            ></Modal>
        </td>
    );
}