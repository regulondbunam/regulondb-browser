import { DataVerifier } from "../../../../components/ui-components";

export default function Data({
    components = [],
    description,
    name,
    number,
    order,
    pathwayComponents,
    type,
}) {
    return (
        <table>
            <tbody>
                {DataVerifier.isValidString(name) && (
                    <tr>
                        <td><p><b>Name:</b></p></td>
                        <td>{name}</td>
                    </tr>
                )}
                {DataVerifier.isValidString(description) && (
                    <tr>
                        <td><p><b>Description:</b></p></td>
                        <td>{description}</td>
                    </tr>
                )}
                {DataVerifier.isValidString(type) && (
                    <tr>
                        <td><p><b>Type:</b></p></td>
                        <td>{type}</td>
                    </tr>
                )}
                {DataVerifier.isValidString(pathwayComponents) && (
                    <tr>
                        <td><p><b>Pathway Components:</b></p></td>
                        <td>{pathwayComponents}</td>
                    </tr>
                )}
                {DataVerifier.isValidArray(components)&&(
                    <tr>
                        <td colSpan={2}>
                            <p><b>Components</b></p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Function</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {components.map((component,index)=>{
                                        return <tr key={"reaction_"+number+"_component_"+index} >
                                            <td>{component.function}</td>
                                            <td>{component.name}</td>
                                            <td>{component.type}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}