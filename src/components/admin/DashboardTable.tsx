import TableHOC from './TableHOC'
import { Column } from 'react-table'
import { DashboardTransactionType } from '../../types/dash.types'


const columns:  Column<DashboardTransactionType>[] = [
    {
        Header: "Id",
        accessor: "_id"
    },
    {
        Header: "Quantity",
        accessor: "quantity"
    },
    {
        Header: "Discount",
        accessor: "discount"
    },
    {
        Header: "Amount",
        accessor: "amount"
    },
    {
        Header: "Status",
        accessor: "status"
    }
]

const DashboardTable = ({ data = [] }: { data: DashboardTransactionType[] }) => {
    
  return TableHOC<DashboardTransactionType> (columns, data, "transactionBox", "Top Transactions")(); 
}

export default DashboardTable