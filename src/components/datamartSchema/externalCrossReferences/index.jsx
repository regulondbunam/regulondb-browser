import PropTypes from 'prop-types';

const PROP_TYPES = {
    externalCrossReferenceId: PropTypes.string.isRequired,
    externalCrossReferenceName: PropTypes.string,
    objectId: PropTypes.string,
    url: PropTypes.string,
}

function ExternalCrossReference({
    externalCrossReferenceId = "",
    externalCrossReferenceName = "",
    objectId = "",
    url = "",
}) {
    return (
        <div
            style={{ float: "left", marginRight: "5px" }}
        >
            <a
                href={`${url}`}
                className="p_accent"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "12px" }}
            >
                {externalCrossReferenceName}
            </a>
        </div>
    );
}

ExternalCrossReference.propTypes = PROP_TYPES

function ExternalCrossReferences({
    externalCrossReferences = [],
    variant = "paragraph",
}){
    return(
        <div>
            {externalCrossReferences.map((ecr,index)=>{
                return <ExternalCrossReference 
                    key={`${ecr.externalCrossReferenceId}_${index}`}
                    {...ecr}
                    />
            })}
        </div>
    )
}

export { ExternalCrossReference, ExternalCrossReferences };