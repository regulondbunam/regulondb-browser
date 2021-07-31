import React from 'react'

export default function Note({note}) {
    if (!note) {
        return null
    }
    return (
        <div>
            <h3>Note</h3>
            <p dangerouslySetInnerHTML={{__html: note}}></p>
        </div>
    )
}
