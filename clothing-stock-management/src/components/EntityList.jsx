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
                            <th scope='col'>Email</th>
                            <th scope='col'>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.data.map(d=>(<tr key={d.supplierId}>
                            <td>{d.supplierId}</td>
                            <td>{d.supplierName}</td>
                            <td>{d.email}</td>
                            <td>{d.phone}</td>
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
                            <th scope='col'>Email</th>
                            <th scope='col'>Address</th>
                            <th scope='col'>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.data.map(d=>(<tr key={d.customerId}>
                            <td>{d.customerId}</td>
                            <td>{d.customerName}</td>
                            <td>{d.email}</td>
                            <td>{d.location}</td>
                            <td>{d.phone}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EntityList;