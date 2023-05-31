import PropTypes from 'prop-types';

const PROP_TYPES = {
    _id: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    citation: PropTypes.string,
    pmid: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    year: PropTypes.number,
};

export function Publication({
    _id,
    authors = [],
    citation = "",
    pmid = "",
    title = "",
    url = "",
    year = 0,
}) {
    return (
        <div>
            <h2>Reference:</h2>
            {url !== "" && <a href={url} target="_blank" rel="noopener noreferrer" >Go to Reference</a>}
            <p>{pmid !== "" ? `pmid: ${pmid}` : ""}</p>
            <p className="citation">{citation !== "" ? citation : ""}</p>
        </div>
    );
}

Publication.propTypes = PROP_TYPES
