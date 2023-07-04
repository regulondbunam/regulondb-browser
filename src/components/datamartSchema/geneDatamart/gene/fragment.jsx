import PropTypes from 'prop-types';


function Fragments({
    fragments = [] ,
    variant,
}) {
    return (
        <table>
            <thead>
                <th>Name</th>
                <th>Centisome Position</th>
                <th>Position</th>
                <th>Sequence</th>
            </thead>
            {
                fragments.map((fragment,index)=>{
                    return <Fragment key={"fragment_"+fragment._id+"_row_"+index} {...fragment} />
                })
            }
        </table>
    );
}

const PROP_TYPES = {
    _id: PropTypes.string.isRequired,
    centisomePosition: PropTypes.string,
    leftEndPosition: PropTypes.number,
    name: PropTypes.string,
    rightEndPosition: PropTypes.number,
    sequence: PropTypes.string,
}

function Fragment({
    _id = "",
    centisomePosition = "",
    leftEndPosition,
    name = "",
    rightEndPosition,
    sequence = "",
}) {
    return (
        <tr>
            <td>{name}</td>
            <td>{centisomePosition}</td>
            <td>{leftEndPosition} - {rightEndPosition}</td>
            <td>{sequence}</td>
        </tr>
    )
}

Fragment.propTypes = PROP_TYPES

export { Fragments };