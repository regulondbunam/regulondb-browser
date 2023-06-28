import React from 'react';
import { TableAllCitations } from '../../../components/citations'

function Citations({AllCitations}) {
    return (
        <div>
            <h2>Citations</h2>
            <TableAllCitations allCitations={AllCitations} />
        </div>
    )
}

export default Citations;