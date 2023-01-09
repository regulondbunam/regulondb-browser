import React, { useState } from 'react';
import { CitationsNote } from '../../../../components/citations/citations_note';

export default function Note({ note = "", allCitations }) {

    const [_display, set_display] = useState(false)

    if (!note) {
        return null
    }

    return (
        <div>
            <p className="p_accent">Note:</p>
            {
                _display
                    ? <p dangerouslySetInnerHTML={{ __html: CitationsNote(allCitations, note) }} />
                    : <p dangerouslySetInnerHTML={{ __html: CitationsNote(allCitations, `${note.substring(0, 500)} ...`) }} />
            }
            <div>
                {
                    note.length > 500
                        ? <button onClick={() => { set_display(!_display) }} >
                            {
                                _display
                                    ? "Show Less"
                                    : "Show More"
                            }
                        </button>
                        : null
                }
            </div>
        </div>
    )
}


