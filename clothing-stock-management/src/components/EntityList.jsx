import {useContext} from 'react';
import InventoryContext from '../Context/InventoryContext';

function EntityList() {

    const {customers, suppliers} = useContext(InventoryContext);

    return (
        <>
            <div>
                <h3>Supplier</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope='col'>Supplier ID</th>
                            <th scope='col'>Supplier</th>
                            <th scope='col'>Product ID</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Phone</th>
                            <th scope='col'>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(d=>(<tr key={d.transactionId}>
                            <td>{d.transactionId}</td>
                            <td>{d.productId}</td>
                            <td>{d.employee}</td>
                            <td>{d.type}</td>
                            <td>{d.entity}</td>
                            <td>{d.time}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
            <div>
                <h3>Customer</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope='col'>Customer ID</th>
                            <th scope='col'>Customer Name</th>
                            <th scope='col'>Product ID</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Phone</th>
                            <th scope='col'>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(d=>(<tr key={d.transactionId}>
                            <td>{d.transactionId}</td>
                            <td>{d.productId}</td>
                            <td>{d.employee}</td>
                            <td>{d.type}</td>
                            <td>{d.entity}</td>
                            <td>{d.time}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EntityList;