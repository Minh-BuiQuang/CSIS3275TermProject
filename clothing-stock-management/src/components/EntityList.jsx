import {useEffect, useState} from 'react';

function EntityList() {
    const [suppliers, setSuppliers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [supplierSearch, setSupplierSearch] = useState("");

    useEffect(()=>{
        const fetchSuppliers = async () => {
            const response = await fetch('https://localhost:44348/api/Supplier');
            const data = await response.json();
            console.log(data);
            setSuppliers(data.data);
        };
        const fetchCustomers = async () => {
            const response = await fetch('https://localhost:44348/api/Customer');
            const data = await response.json();
            console.log(data);
            setCustomers(data.data);
        }
        fetchSuppliers();
        fetchCustomers();
    }, [])

    const onSupplierSearchChange = (e) => {
        setSupplierSearch(e.target.value);
    }
    
    return (
        <>
            <div>
                <form className='d-flex justify-content-between'>
                    <h3>Supplier</h3>
                    <input className="form-control mr-sm-2 w-25" type="search" placeholder="Search" aria-label="Search" onChange={onSupplierSearchChange} value={supplierSearch} />
                </form>
                
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
                        {suppliers.map(d=>(<tr key={d.supplierId}>
                            <td>{d.supplierId}</td>
                            <td>{d.supplierName}</td>
                            <td>{d.email}</td>
                            <td>{d.phone}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
            <div>
                <form className='d-flex justify-content-between'>
                    <h3>Customers</h3>
                    <input className="form-control mr-sm-2 w-25" type="search" placeholder="Search" aria-label="Search" />
                </form>
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
                        {customers.map(d=>(<tr key={d.customerId}>
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