import { useContext } from "react";
import InventoryContext from "../Context/InventoryContext";

function CurrentStock() {

    const {currentStocks} = useContext(InventoryContext);
    console.log(currentStocks);
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope='col'>Product Name</th>
                    <th scope='col'>Product ID</th>
                    <th scope='col'>Category</th>
                    <th scope='col'>Supplier</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Size</th>
                    <th scope='col'>Description</th>
                </tr>
            </thead>
            <tbody>
                {currentStocks.data.map(d=>(<tr key={d.productId}>
                    <td>{d.productId}</td>
                    <td>{d.productName}</td>
                    <td>{d.category}</td>
                    <td>{d.supplier}</td>
                    <td>{d.quantity}</td>
                    <td>{d.size}</td>
                    <td>{d.description}</td>
                </tr>))}
            </tbody>
        </table>
    )
}

export default CurrentStock;