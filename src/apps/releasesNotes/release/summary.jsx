import { Card } from "../../../components/ui-components"
import Style from "../style.module.css"

function validObject(obj) {
    if (!obj) {
        return false
    }
    if (obj === null) {
        return false
    }
    return true
}

export function Summary({ statistics }) {
    if (statistics === null) {
        return null
    }
    return (
        <Card id={"ReleaseSummary"} title="Summary"  >
            <div style={{ margin: "2%" }} >
                <table className={Style.table} >
                    <thead>
                        <tr>
                            <th>Object</th>
                            <th> --- </th>
                            <th> Total </th>
                            <th>Weak Evidence</th>
                            <th>Strong Evidence</th>
                            <th>Confirmed Evidence</th>
                            <th>Without Evidence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(statistics).map((key, index) => {
                                return <Rooting key={key + "_table_" + index} statistic={statistics[key]} rdbObject={key} />
                            })
                        }
                    </tbody>
                </table>
            </div>
            <br />
        </Card>
    )
}

function Rooting({ rdbObject, statistic }) {
    if (!statistic) {
        return null
    }
    if (statistic === null) {
        return null
    }
    if (statistic.__typename === "detailedStatistics") {
        return <DetailedStatistics rdbObject={rdbObject} statistic={statistic} />
    }
    if (statistic.__typename === "dbInfoExternalReferencesType") {
        return <DbInfoExternalReferencesType rdbObject={rdbObject} statistic={statistic} />
    }
    if (statistic.__typename === "productsDBInfoType") {
        return <ProductsDBInfoType rdbObject={rdbObject} statistic={statistic} />
    }
    if (statistic.__typename === "dbInfoRegulons") {
        return <DbInfoRegulons rdbObject={rdbObject} statistic={statistic} />
    }
    return null
}

function DbInfoRegulons({ rdbObject, statistic }) {
    const {
        complexRegulons,
        simpleRegulons,
        total,
    } = statistic
    if (!validObject(total)) {
        return null
    }
    if (!validObject(complexRegulons) && !validObject(simpleRegulons)) {
        return null
    }
    return (
        <>
            <tr>
                <th>{rdbObject}</th>
                <td></td>
                <td>{total}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            {validObject(complexRegulons.total)
                ? (<SubDetailedStatistics rdbObject={`Complex (${complexRegulons.total})`} statistic={complexRegulons} isTotal={false} />)
                : null
            }
            {validObject(simpleRegulons.total)
                ? (<SubDetailedStatistics rdbObject={`Simple (${simpleRegulons.total})`} statistic={simpleRegulons} isTotal={false} />)
                : null
            }
        </>
    )
}

function ProductsDBInfoType({ rdbObject, statistic }) {
    const {
        polypeptides,
        rnas,
        srna,
    } = statistic
    if (!validObject(polypeptides) && !validObject(rnas) && !validObject(srna)) {
        return null
    }
    return (
        <>
            <tr>
                <th>{rdbObject}</th>
                <td colSpan={5} ></td>
            </tr>
            {validObject(polypeptides.total)
                ? (<SubDetailedStatistics rdbObject={"Polypeptides"} statistic={polypeptides} />)
                : null
            }
            {validObject(rnas.total)
                ? (<SubDetailedStatistics rdbObject={"RNAs"} statistic={rnas} />)
                : null
            }
            {validObject(srna.total)
                ? (<SubDetailedStatistics rdbObject={"sRNA"} statistic={srna} />)
                : null
            }
        </>

    )
}

function DbInfoExternalReferencesType({ rdbObject, statistic }) {

    const {
        origin,
        total,
    } = statistic
    if (!origin) {
        return null
    }
    if (origin === null) {
        return null
    }
    return (
        <tr>
            <th>{rdbObject}</th>
            <td>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(origin).map((key, index) => {
                            if (key === "__typename") {
                                return null
                            }
                            if (!origin[key]) {
                                return null
                            }
                            if (origin[key] === null) {
                                return null
                            }
                            return (
                                <tr key={"reference_" + key + "_index"}>
                                    <td>{key}</td>
                                    <td>{origin[key]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </td>
            <td>{total}</td>
        </tr>

    )
}

function SubDetailedStatistics({ rdbObject, statistic, isTotal = true }) {
    const {
        confirmed,
        strong,
        total,
        weak,
        withoutEvidences,
    } = statistic
    if (total === null) {
        return null
    }
    return (
        <tr>
            <td></td>
            <th>{rdbObject}</th>
            <td>{isTotal && (total)}</td>
            <td>{weak}</td>
            <td>{strong}</td>
            <td>{confirmed}</td>
            <td>{withoutEvidences}</td>
        </tr>
    )
}

function DetailedStatistics({ rdbObject, statistic }) {
    const {
        confirmed,
        strong,
        total,
        weak,
        withoutEvidences,
    } = statistic
    if (total === null) {
        return null
    }
    return (
        <tr>
            <th>{rdbObject}</th>
            <td></td>
            <td>{total}</td>
            <td>{weak}</td>
            <td>{strong}</td>
            <td>{confirmed}</td>
            <td>{withoutEvidences}</td>
        </tr>
    )
}