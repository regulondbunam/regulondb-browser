/** 
 # Component (user guide)

# Regulators
	
## Description  
	
It displays the controllers in a standard table or in a filterable table, and use links to access the details of each controller.

## Category   
	
Visual

## Live demo 
--

## Installation or Implementation
--

## Usage 
--

## Props 

| Attribute | Type | Default | Description                                                                                            |
| --------- | ---- | ------- | ------------------------------------------------------------------------------------------------------ |
|regulators |array |   []    |it is used to provide the data of the controllers to be displayed or processed in the component         |
|variant    |string|"minimal"|allows the component to have different variations or modes of operation depending on the value provided.|

## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team


# Component (technical guide)

## Component Type 

Visual

## Dependencies

useMemo: it is imported from "react" and used to memoize and optimize the calculation of derived data.
Link: it is imported from "react-router-dom" and is used to create links (hyperlinks) to the regulator detail pages.
DataVerifier: it is used to verify or validate data.
FilterTable: it is a component used to create tables with data filtering and searching capabilities.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description                                                                          |  Syntax                                                  | Additional Notes or References | 
| ------ | -----------------------------------------------------------------------------------  | ---------------------------------------------------------| ------------------------------ |
|useMemo |It is a React Hook that lets you cache the result of a calculation between re-renders.| const cachedValue = useMemo(calculateValue, dependencies)|                                |


 * **/

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DataVerifier, FilterTable } from "../../../ui-components";

/**
 * Description placeholder
 *
 * @type {array}
 */
const COLUMNS = [
  {
    id: "regulator_name",
    header: "Name",
    accessorKey: "_name",
    filter: "fuzzyText",
    cell: (info) => (
      <Link to={"/regulon/" + info.row.original.id}>{info.getValue()}</Link>
    ),
  },
];

/**
 * Description placeholder
 *
 * @param {array} [regulators=[]]
 * @returns {array}
 */
function formatData(regulators = []) {
  /**
   * Description placeholder
   *
   * @type {array}
   */
  let data = [];
  if (DataVerifier.isValidArray(regulators)) {
    regulators.forEach(
      /**
       * Description placeholder
       * @param {object} regulator - The regulator object to format.
       * @param {number} index - The index of the regulator in the list.
       */
      (regulator, index) => {
        const { _id, name } = regulator;
        data.push({
          id: _id,
          //_name: <Link value={regulator.name} to={"/regulator/" + _id} >{regulator.name}</Link>,
          _id: _id,
          _name: name,
        });
      }
    );
  }
  return data;
}

/**
 * Description placeholder
 *
 * @export
 * @param {{ regulators?: {}; variant?: string; }} { regulators = [], variant = "minimal" }
 * @returns {React.JSX}
 */
export default function Regulators({ regulators = [], variant = "minimal" }) {
  switch (variant) {
    case "filterTable":
      return <Table regulators={regulators} />;
    default:
      return (
        <table className="tableAccent">
          <tbody>
            {regulators.map(
              /**
               * Description placeholder
               *
               * @param {object} regulator - The regulator object to format.
               * @param {number} index - The index of the regulator in the list.
               * @returns {React.JSX}
               */
              (regulator, index) => {
                return (
                  <Regulator
                    key={"regulatorData_" + index + "_" + regulator._id}
                    {...regulator}
                  />
                );
              }
            )}
          </tbody>
        </table>
      );
  }
}

/**
 * Description placeholder
 *
 * @param {{ _id: any; RegulatorFunction: any; name: any; type: any; }} { _id, RegulatorFunction, name, type }
 * @returns {HTMLElement|null}
 */
function Regulator({ _id, RegulatorFunction, name, type }) {
  return (
    <tr>
      <td>
        <Link to={"/regulon/" + _id}>{name}</Link>
      </td>
      <td>{type}</td>
    </tr>
  );
}

/**
 * Description placeholder
 *
 * @param {{ regulators: any; }} { regulators }
 * @returns {React.JSX}
 */
function Table({ regulators }) {
  /**
   * Description placeholder
   *
   * @type {array}
   */
  const data = useMemo(() => {
    return formatData(regulators);
  }, [regulators]);
  return <FilterTable columns={COLUMNS} data={data} />;
}
