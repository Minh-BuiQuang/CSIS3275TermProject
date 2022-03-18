import {useContext} from 'react';
import InventoryContext from '../Context/InventoryContext';

function StockRecords() {
    const {transactions} = useContext(InventoryContext);

    if(transactions == null)     
        return ""
    else
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Product</th>
                        <th scope='col'>Employee</th>
                        <th scope='col'>Type</th>
                        <th scope='col'>Entity</th>
                        <th scope='col'>Time</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.sort((a,b) => b.transactionNumber - a.transactionNumber).map(d=>(<tr key={d.transactionNumber}>
                        <td>{d.transactionNumber}</td>
                        <td>{d.productName}</td>
                        <td>{d.employeeName}</td>
                        <td>{d.type}</td>
                        <td>{d.supplierName == null ? (d.customerName == null ? "-" : d.customerName) : d.supplierName}</td>
                        <td>{new Date(d.date).toLocaleTimeString()}</td>
                        <td>{new Date(d.date).toLocaleDateString()}</td>
                        <td style={{textAlign: 'right', paddingRight:'40px'}}>{d.quantity}</td>
                        <td>{d.comments}</td>
                    </tr>))}
                </tbody>
            </table>
        )
}

export default StockRecords;