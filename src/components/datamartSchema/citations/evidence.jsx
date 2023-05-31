import PropTypes from 'prop-types';

const PROP_TYPES = {
    _id: PropTypes.string.isRequired,
    additiveEvidenceCodeRule: PropTypes.number,
    code: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
};

export function EvidenceTitle({
    _id,
    additiveEvidenceCodeRule = 0,
    code = "",
    name = "",
    type = "",
}) {
    let styleStrong = {};
    if (type === "Strong") {
        styleStrong = { fontWeight: "bold" };
    }
    if(code !== ""){
        code = code+": "
    }
    return (
        <div>
            <h2>Evidence</h2>
            <h1 style={styleStrong} >
                {code}: {name}
                <br />{type}
            </h1>
        </div>
    );
}

EvidenceTitle.propTypes = PROP_TYPES