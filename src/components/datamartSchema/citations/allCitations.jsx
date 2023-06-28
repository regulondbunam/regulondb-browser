import { ModalCitation } from "./modal"

export function AllCitations({ allCitations, small = false }) {
    if(!allCitations){
        return null
    }
    return (
        <>

            <table>
                <tbody>
                    {

                        allCitations.map((cit, index) => {
                            try {
                                return (
                                    <tr key={`citation_no_000${index}`}>
                                        <td>
                                            <ModalCitation
                                                evidence={cit.evidence}
                                                publication={cit.publication}
                                                index={index+1}
                                                small={small}
                                            />
                                        </td>
                                    </tr>
                                )
                            } catch (error) {
                                return null
                            }
                        })
                    }
                </tbody>
            </table>
            <br />
            <br />
        </>
    )
}