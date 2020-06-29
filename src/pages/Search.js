import React from 'react';
import { withRouter } from 'react-router-dom';
import CoverSearch from './components/search/CoverSearch'
import ResultSearch from './components/search/ResultSearch'

const Search = ({
    location
}) => {
    const search = BreakPathName(location.pathname)
    //console.log(search, ": ", search.length)
    if (search.length <= 0) {
        return (
            <>
                {
                    CoverSearch()
                }
                <div style={{ padding: "5% 10% 5% 10%" }}>
                    <p>
                        Welcome to the regulonDB search tool, from here,
                        with a simple search you will be able to find your favorite gene ;)
            <br />
            You can search genes by name or product or both with the words OR or AND
            Example:
            <br />
            "araC AND arabinose"
            <br />
            "araC  OR transcriptional regulator
            </p>
                </div>

            </>
        )
    }
    return <ResultSearch search={search}/>
}

function BreakPathName(pathname) {
    pathname = pathname.slice(8)
    return pathname
}

export default withRouter(Search);