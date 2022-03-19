import * as JsSearch from 'js-search';
import {useEffect, useState} from 'react';

function Customers() {
    const [data, setData] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [search, setSearch] = useState("");
    var jssearch = new JsSearch.Search('customerId');
    jssearch.addIndex('customerName');
    jssearch.addIndex('location');
    jssearch.addIndex('email');
    jssearch.addIndex('phone');
    jssearch.addDocuments(data);

    useEffect(()=>{
        const fetchEntityData = async () => {
            const response = await fetch('https://localhost:44348/api/Customer');
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
                    <h3>Customers</h3>
                    <input type="text" className="form-control w-25" placeholder="Search" value={search} onChange={handleSearch}  />
                </div>
                <table className="table table-striped data-table">
                    <thead className="data-table">
                        <tr className="data-table">
                            <th scope='col' width='10%'>ID</th>
                            <th scope='col'>Customer Name</th>
                            <th scope='col'>Location</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Phone</th>
                        </tr>
                    </thead>
                    <tbody className="data-table">
                        {data.map(d=>(<tr key={d.customerId}>
                                <td width='10%'>{d.customerId}</td>
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