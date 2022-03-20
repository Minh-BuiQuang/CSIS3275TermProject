import {useEffect, useState} from 'react';
import {supplier_jssearch} from '../utils/JsSearch';

function Suppliers() {
    const [data, setData] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [search, setSearch] = useState("");
    supplier_jssearch.addDocuments(data);

    useEffect(()=>{
        const fetchEntityData = async () => {
            const response = await fetch('https://localhost:44348/api/Supplier');
            const data = await response.json();
            setData(data.data);
        };
        fetchEntityData();
    }, [refreshData]);

    const handleSearch = (e) => {
        if(e.target.value === "") {
            setRefreshData(!refreshData);
        }
        setSearch(e.target.value);
        setData(supplier_jssearch.search(e.target.value));
    }
    
    return (
        <>
            <div>
                <div className='d-flex justify-content-between'>
                <h3>Suppliers</h3>
                    <input type="text" className="form-control w-25" placeholder="Search" value={search} onChange={handleSearch}  />
                </div>
                <table className="table table-striped data-table">
                    <thead className="data-table">
                        <tr className="data-table">
                            <th scope='col' width='10%'>ID</th>
                            <th scope='col'>Supplier Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Phone</th>
                        </tr>
                    </thead>
                    <tbody className="data-table">
                        {data.map(d=>(<tr key={d.supplierId}>
                                <td width='10%'>{d.supplierId}</td>
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