import {useEffect, useState} from 'react';

function Suppliers() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchEntityData = async () => {
            const response = await fetch('https://localhost:44348/api/Supplier');
            const data = await response.json();
            setData(data.data);
        };
        fetchEntityData();
    }, []);
    
    return (
        <>
            <div>
                <h3>Suppliers</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope='col'>Supplier ID</th>
                            <th scope='col'>Supplier Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(d=>(<tr key={d.supplierId}>
                                <td>{d.supplierId}</td>
                                <td>{d.supplierName}</td>
                                <td>{d.email}</td>
                                <td>{d.phone}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Suppliers;