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
            <h3>Transactions</h3>
            <input type="text" className="form-control w-25" placeholder="Search" value={search} onChange={handleSearch}  />
        </div>
        <table className="table table-striped data-table">
                <thead className="data-table">
                    <tr className="data-table">
                        <th scope='col' width='5%'>ID</th>
                        <th scope='col' width='19%'>Product</th>
                        <th scope='col' width='10%'>Employee</th>
                        <th scope='col' width='5%'>Type</th>
                        <th scope='col' width='14%'>Entity</th>
                        <th scope='col' width='10%'>Time</th>
                        <th scope='col' width='11%'>Date</th>
                        <th scope='col' width='7%'>Quantity</th>
                        <th scope='col'>Comments</th>
                    </tr>
                </thead>
                <tbody className="data-table">
                    {transactions.sort((a,b) => b.transactionNumber - a.transactionNumber).map(d=>(<tr key={d.transactionNumber}>
                        <td width='5%'>{d.transactionNumber}</td>
                        <td width='20%'>{d.productName}</td>
                        <td width='9%'>{d.employeeName}</td>
                        <td width='5%'>{d.type}</td>
                        <td width='15%'>{d.supplierName == null ? (d.customerName == null ? "-" : d.customerName) : d.supplierName}</td>
                        <td width='10%'>{new Date(d.date).toLocaleTimeString()}</td>
                        <td width='12%'>{new Date(d.date).toLocaleDateString()}</td>
                        <td width='7%' style={{textAlign: 'right', paddingRight:'40px'}}>{d.quantity}</td>
                        <td>{d.comments}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default StockRecords;