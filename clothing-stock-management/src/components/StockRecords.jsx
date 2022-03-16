import {useContext} from 'react';
import InventoryContext from '../Context/InventoryContext';

function StockRecords() {
    const {stockRecords} = useContext(InventoryContext);
    console.log(stockRecords);
    if(stockRecords.data == null)     
        return ""
    else
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope='col'>Transaction ID</th>
                        <th scope='col'>Product</th>
                        <th scope='col'>Employee</th>
                        <th scope='col'>Type</th>
                        <th scope='col'>Entity</th>
                        <th scope='col'>Time</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {stockRecords.data.map(d=>(<tr key={d.transactionNumber}>
                        <td>{d.transactionNumber}</td>
                        <td>{d.productName}</td>
                        <td>{d.employeeName}</td>
                        <td>{d.type}</td>
                        <td>{d.supplierName == null ? (d.customerName == null ? "-" : d.customerName) : d.supplierName}</td>
                        <td>{new Date(d.date).toTimeString().substring(0,8)}</td>
                        <td>{new Date(d.date).toDateString().substring(4)}</td>
                        <td style={{textAlign: 'right', paddingRight:'40px'}}>{d.quantity}</td>
                    </tr>))}
                </tbody>
            </table>
        )
}

export default StockRecords;