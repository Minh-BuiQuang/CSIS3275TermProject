import {useEffect, useState} from 'react';

function StockRecords() {

    const [transactions, setTransactions] = useState([]);

    useEffect(()=>{
        const fetchTransactions = async () => {
            const response = await fetch('https://localhost:44348/api/Stock');
            const data = await response.json();
            setTransactions(data.data);
        }
        fetchTransactions();
    }, [])
    return (
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
    )
}

export default StockRecords;