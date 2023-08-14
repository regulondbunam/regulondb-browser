import { useMemo } from "react";
import { DataVerifier, FilterTable } from "../../../../components/ui-components";
import { Link } from "react-router-dom";

const COLUMNS = [
    {
        id: 'gene_ame',
        header: 'Name',
        accessorKey: '_name',
        filter: "fuzzyText",
        cell: info=><Link to={"/gene/" + info.row.original.id} >{info.getValue()}</Link>,
      },
]
function formatData(genes = []) {
    let data = []
    if (DataVerifier.isValidArray(genes)) {
      genes.forEach((gene, index) => {
        const { _id, name } = gene
        data.push({
          id: _id,
          //_name: <Link value={regulator.name} to={"/gene/" + _id} >{regulator.name}</Link>,
          _id: _id,
          _name: name,
        })
      })
    }
    return data
  }

export default function Genes({genes}){
    const data = useMemo(() => {
        return formatData(genes)
      }, [genes])
      //console.log(data);
      return <FilterTable columns={COLUMNS} data={data} />
}
