import * as JsSearch from 'js-search';
import {useEffect, useState} from 'react';

function Suppliers() {
    const [data, setData] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [search, setSearch] = useState("");
    var jssearch = new JsSearch.Search('supplierId');
    jssearch.addIndex('supplierName');
    jssearch.addIndex('email');
    jssearch.addIndex('phone');
    jssearch.addDocuments(data);

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
        setData(jssearch.search(e.target.value));
    }
    
    return (
        <>
            <div>
                <div className='d-flex justify-content-between'>
                <h3>Suppliers</h3>
                    <input type="text" className="form-control w-25" placeholder="Search" value={search} onChange={handleSearch}  />
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
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