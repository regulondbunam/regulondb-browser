import React,{ useState } from 'react';
import { CitationCONTEXT } from '../../components/citations/citations_provider';
import {CitationsNote} from '../../components/citations/citations_note'
import ReactTooltip from 'react-tooltip';

export default function Note({note = ""}) {

    const [_display, set_display] = useState(false)

    if (!note) {
        return null
    }

    return (
        <div>
            <h3>Note</h3>
            <table>
                <tbody>
                    <tr>
                        <td>
                        {
                            _display
                            ?<div>
                                <p dangerouslySetInnerHTML={{__html: CitationsNote(CitationCONTEXT,note)}}/>
                                <ReactTooltip place="bottom" type="light" border={true} />
                            </div>
                            :<p dangerouslySetInnerHTML={{__html: CitationsNote(CitationCONTEXT,note.substring(0,500))}}/>
                        }
                        
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {
                                note.length>500
                                ?<button className="aBase" onClick={()=>{set_display(!_display)}} >
                                    {
                                        _display
                                        ?"Show Less"
                                        :"Show More"
                                    }
                                    </button>
                                : null
                            }
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


