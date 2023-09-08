
/**
 * Description placeholder
 *
 * @export
 * @param {{ multifunTerms?: {}; }} { multifunTerms=[] }
 * @returns {React.JSX}
 */
export function MultifunTerms({ multifunTerms=[] }) {
    return (
        <div >
            {multifunTerms.map((m, i) => {
                return (
                    <div key={`multifun${i}-data-${m.id}`}>
                        <p><b>{`${m.label}: ${m.name}`}</b></p>
                    </div>
                );
            })}
        </div>
    );
}