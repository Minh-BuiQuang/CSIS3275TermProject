import {useEffect, useState} from 'react';
import {transactions_jssearch} from '../utils/JsSearch';

function StockRecords() {

    const [transactions, setTransactions] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [search, setSearch] = useState("");
    transactions_jssearch.addDocuments(transactions);

    useEffect(()=>{
        const fetchTransactions = async () => {
            const response = await fetch('https://localhost:44348/api/Stock');
            const data = await response.json();
            setTransactions(data.data);
        }
        fetchTransactions();
    }, [refreshData])

    const handleSearch = (e) => {
        if(e.target.value === "") {
            setRefreshData(!refreshData);
        }
        setSearch(e.target.value);
        setTransactions(transactions_jssearch.search(e.target.value));
    }

    return (
        <div>
         <div className='d-flex justify-content-between'>
            <div className="container d-flex mt-2 mb-2">
            <h4 className="flex-grow-1" >Transactions</h4>
            <input type="text" className="form-control w-25" placeholder="Search" value={search} onChange={handleSearch}  />
            </div>
        </div>
        <table className="table table-striped data-table container table-responsive d-flex flex-column mt-3">
                <thead className="data-table">
                    <tr className="data-table">
                        <th scope='col' className='col-2' >Transaction ID</th>
                        <th scope='col' className='col-2' >Product</th>
                        <th scope='col' className='col-1' >Employee</th>
                        <th scope='col' className='col-1' >Type</th>
                        <th scope='col' className='col-2' >Entity</th>
                        <th scope='col' className='col-1' >Time</th>
                        <th scope='col' className='col-1' >Date</th>
                        <th scope='col' className='col-1' >Quantity</th>
                        <th scope='col' className='col-1' >Comments</th>
                    </tr>
                </thead>
                <tbody className="scroll w-auto">
                    {transactions.sort((a,b) => b.transactionNumber - a.transactionNumber).map(d=>(<tr key={d.transactionNumber}>
                        <td className ='col-2 ellipsis'>{d.transactionId}<span>{d.transactionId}</span></td>
                        <td className ='col-2' >{d.productName}</td>
                        <td className ='col-1'>{d.employeeName}</td>
                        <td className ='col-1'>{d.type}</td>
                        <td className ='col-2' >{d.supplierName == null ? (d.customerName == null ? "-" : d.customerName) : d.supplierName}</td>
                        <td className ='col-1' >{new Date(d.date).toLocaleTimeString()}</td>
                        <td className ='col-1' >{new Date(d.date).toLocaleDateString()}</td>
                        <td className ='col-1 text-start'>{d.quantity}</td>
                        <td className ='col-1'>{d.comments}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default StockRecords;