import {useContext, useState} from 'react';
import InventoryContext from '../Context/InventoryContext';

function StockOut() {

    const {stockOutProduct, fetchProductDetails} = useContext(InventoryContext);

    const [productId, setProductId] = useState("");
    const [supplier, setSupplier] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [customer, setCustomer] = useState("");
    const [description, setDescription] = useState("");

    const handleProductIdChange = async (e) => {
        setProductId(e.target.value);
        if(e.target.value.length!==4) {
            return;
        }
        const productDetails = await fetchProductDetails(e.target.value);
        if(productDetails && productDetails.length > 0) {
            setSupplier([...new Set(productDetails.map(i=>i.supplier))]);
            setQuantity(productDetails[0].quantity);
            setDescription(productDetails[0].description);
        }
    } 

    const handleStockOut = (e) => {
        e.preventDefault();

        // validations
        if(productId.trim()===""
            || quantity<=0 
            || customer.trim()==="" 
            || selectedSupplier.trim()===""
        ) {
            window.alert("Please give all necessary fields");
            return;
        }

        // stock out
        stockOutProduct({
            productId: productId,
            quantity: quantity,
            supplier: selectedSupplier,
            customer: customer
        });

        // Clear the fields
        setProductId("");
        setQuantity("");
        setSelectedSupplier("");
        setSupplier([]);
        setCustomer("");
    }

    const handleCustomerChange = (e) => {
        setCustomer(e.target.value);
    }

    const handleSupplierChange = (e) => {
        setSelectedSupplier(e.target.value);
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    return (
        <div className="row">
            <form className="col-4" onSubmit={handleStockOut}>
                <input type="text" className="form-control form-control-lg mb-3" value={productId} onChange={handleProductIdChange} placeholder="Product ID"/>
                <input type="text" className="form-control form-control-lg mb-3" value={quantity} onChange={handleQuantityChange} placeholder="Quantity"/>
                <select className="form-control form-control-lg custom-select custom-select-lg mb-3" onChange={handleSupplierChange}>
                    <option value="">Select Supplier</option>
                    {supplier.map(i=>(<option key={i} value={i}>{i}</option>))}
                </select>
                <input type="text" className="form-control form-control-lg mb-3" value={customer} onChange={handleCustomerChange} placeholder="Customer Name"/>
                <input type="submit" className="btn btn-lg btn-success w-100 mb-3" value="Stock Out" />
            </form>
            <div className="col-8">
                <textarea className={"w-100 h-100 description-box "+(description?"text-dark":"text-muted")} onChange={handleDescriptionChange} value={description} placeholder="Add product Id to view product details." />
            </div>
        </div>
    ) 
}

export default StockOut;