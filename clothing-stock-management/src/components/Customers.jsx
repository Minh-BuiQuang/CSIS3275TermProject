import {useEffect, useState} from 'react';

function Customers() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        const fetchEntityData = async () => {
            const response = await fetch('https://localhost:44348/api/Customer');
            const data = await response.json();
            setData(data.data);
        };
        fetchEntityData();
    }, []);


    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    
    return (
        <>
            <div>
                <h3>Customers</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope='col'>Customer ID</th>
                            <th scope='col'>Customer Name</th>
                            <th scope='col'>Location</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(d=>(<tr key={d.customerId}>
                                <td>{d.customerId}</td>
                                <td>{d.customerName}</td>
                                <td>{d.location}</td>
                                <td>{d.email}</td>
                                <td>{d.phone}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Customers;