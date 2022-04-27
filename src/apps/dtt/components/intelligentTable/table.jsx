import React, { useState } from "react";

export default function Table({ dataTable }) {
    const [_nRows, set_nRows] = useState(5);
    const [currentRow, setCurrentRow] = useState(0);
    const [search, setSearch] = useState("");
    const rows = dataTable.rows;
    const totalRows = rows.length;

    const filteredRows = () => {
        if (search.length === 0) {
            return rows.slice(currentRow, currentRow + _nRows);
        }
        let newRows = [];
        let re = new RegExp(search);
        rows.map((row) => {
            let text = row
                .map((data) => {
                    return data.data;
                })
                .join(", ");
            if (re.test(text)) {
                newRows.push(row);
            }
            return null;
        });
        return newRows;
    };

    const nextPage = () => {
        let tope = Number(currentRow) + Number(_nRows);
        if (tope < totalRows) setCurrentRow(Number(currentRow) + Number(_nRows));
    };

    const prevPage = () => {
        if (currentRow > 0) setCurrentRow(currentRow - _nRows);
    };

    const onSearchChange = ({ target }) => {
        setCurrentRow(0);
        setSearch(target.value);
    };
    const onSelectChange = ({ target }) => {
        setCurrentRow(0);
        set_nRows(Number(target.value));
    };

    return (
        <table className="table_content">
            <thead>
                <PageControl
                    prevPage={prevPage}
                    nextPage={nextPage}
                    _nRows={_nRows}
                    set_nRows={set_nRows}
                    onSearchChange={onSearchChange}
                    totalRows={totalRows}
                    onSelectChange={onSelectChange}
                />
                <tr>
                    {dataTable.columns.map((col, indx) => {
                        return <th key={`thTable_${indx}`}>{col.name}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {filteredRows().map((row, index) => {
                    return (
                        <tr key={`trTable_${index}`}>
                            {row.map((r, indx) => {
                                return <td key={`tdTable_${indx}`}>{r.data}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

function PageControl({
    prevPage,
    nextPage,
    _nRows,
    onSearchChange,
    totalRows,
    onSelectChange
}) {
    return (
        <tr>
            <th colSpan="10">
                <input type="text" placeholder="Search" onChange={onSearchChange} />
                &nbsp;
                <button className="pagination" onClick={prevPage}>
                    {"<"}
                </button>
                &nbsp;
                <button className="pagination" onClick={nextPage}>
                    {">"}
                </button>
                &nbsp;
                <select defaultValue={_nRows} onChange={onSelectChange}>
                    {[5, 10, 20, 40, 50, totalRows].map((_nRows) => (
                        <option key={_nRows} value={_nRows}>
                            Show {_nRows}
                        </option>
                    ))}
                </select>
            </th>
        </tr>
    );
}
