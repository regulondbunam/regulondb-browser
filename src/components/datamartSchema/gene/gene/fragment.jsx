import PropTypes from 'prop-types';


/**
 * Description placeholder
 *
 * @param {{ fragments?: {}; variant: any; }} {
    fragments = [] ,
    variant,
}
 * @param {array} fragments - List of fragments to display.
 * @param {string} variant - Component variant.
 * @returns {React.JSX}
 */
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
                fragments.map(
                    
                    /**
                     * Renders an individual fragment.
                     *
                     * @param {*} fragment - Fragment data.
                     * @param {number} index - Index of the fragment in the list.
                     * @returns {React.JSX} JSX representing a fragment.
                     */
                    (fragment,index)=>{
                    return <Fragment key={"fragment_"+fragment._id+"_row_"+index} {...fragment} />
                })
            }
        </table>
    );
}


/**
 * Description placeholder
 * @property {string} _id - Fragment identifier (required).
 * @property {string} centisomePosition - Centisome position.
 * @property {number} leftEndPosition - Start position.
 * @property {string} name - Fragment name.
 * @property {number} rightEndPosition - End position.
 * @property {string} sequence - Fragment sequence.
 * 
 * @type {{ _id: any; centisomePosition: any; leftEndPosition: any; name: any; rightEndPosition: any; sequence: any; }}
 */
const PROP_TYPES = {
    _id: PropTypes.string.isRequired,
    centisomePosition: PropTypes.string,
    leftEndPosition: PropTypes.number,
    name: PropTypes.string,
    rightEndPosition: PropTypes.number,
    sequence: PropTypes.string,
}


/**
 * Description placeholder
 * @param {string} _id - Fragment identifier.
 * @param {string} centisomePosition - Centisome position.
 * @param {number} leftEndPosition - Start position.
 * @param {string} name - Fragment name.
 * @param {number} rightEndPosition - End position.
 * @param {string} sequence - Fragment sequence.
 * 
 * @param {{ _id?: string; centisomePosition?: string; leftEndPosition: any; name?: string; rightEndPosition: any; sequence?: string; }} {
    _id = "",
    centisomePosition = "",
    leftEndPosition,
    name = "",
    rightEndPosition,
    sequence = "",
}
 * @returns {React.JSX}
 */
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