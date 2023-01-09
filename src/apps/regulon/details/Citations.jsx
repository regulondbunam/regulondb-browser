import React from 'react';
import { TableAllCitations } from '../../../components/citations'

function Citations({allCitations}) {
    return (
        <div>
            <h2>Citations</h2>
            <TableAllCitations allCitations={allCitations} />
        </div>
    )
}

export default Citations;