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
    let evidenceType
    switch (type) {
        case "S":
            evidenceType = <span style={{ fontWeight: "bold", color: "#0C6A87" }} >Strong</span>
            break;
        case "C":
            evidenceType = <span style={{ fontWeight: "bold", color: "#000000" }} >Confirmed</span>
            break;
        case "W":
            evidenceType = <span style={{ color: "#0C6A87" }} >Weak</span>
            break;
        default:
            evidenceType = ""
            break;
    }
    if(code !== ""){
        code = code+": "
    }
    return (
        <div>
            <h2>Evidence:</h2>
            <h3>
                {code}{name}
            </h3>
            <p style={{fontSize: "20px"}} >{evidenceType}</p>
        </div>
    );
}

EvidenceTitle.propTypes = PROP_TYPES