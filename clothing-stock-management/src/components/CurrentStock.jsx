import {useEffect, useState } from "react";
import {currentStocks_jssearch} from '../utils/JsSearch';

function CurrentStock() {

    const [currentStocks, setCurrentStocks] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [search, setSearch] = useState("");
    currentStocks_jssearch.addDocuments(currentStocks);

    useEffect(()=>{
        const fetchCurrentStocks = async () => {
            const response = await fetch('https://localhost:44348/api/Product');
            const data = await response.json();
            setCurrentStocks(data.data);
        }
        fetchCurrentStocks();
    }, [refreshData])

    // handle search
    const handleSearch = (e) => {
        if(e.target.value === "") {
            setRefreshData(!refreshData);
        }
        setSearch(e.target.value);
        setCurrentStocks(currentStocks_jssearch.search(e.target.value));
    }

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h3>Current Stocks</h3>
                <input type="text" className="form-control w-25" placeholder="Search" value={search} onChange={handleSearch}  />
            </div>
            <table className="table table-striped data-table">
            <thead className="data-table">
                <tr className="data-table">
                    <th scope='col' width='5%'>ID</th>
                    <th scope='col' width='19%'>Product Name</th>
                    <th scope='col' width='11%'>Category</th>
                    <th scope='col' width='7%'>Quantity</th>
                    <th scope='col' width='7%'>Size</th>
                    <th scope='col'>Description</th>
                </tr>
            </thead>
            <tbody className="data-table">
                {currentStocks.map(d=>(<tr key={d.productId}>
                    <td width='5%'>{d.productId}</td>
                    <td width='20%'>{d.productName}</td>
                    <td width='11%'>{d.category}</td>
                    <td width='7%'>{d.quantity}</td>
                    <td width='7%'>{d.size}</td>
                    <td>{d.description}</td>
                </tr>))}
            </tbody>
        </table>
        </div>
        
    )
}

export default CurrentStock;
