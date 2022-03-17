import {useContext, useEffect, useState} from 'react';
import InventoryContext from '../Context/InventoryContext';

function StockIn() {

    const {addStockRecord, products, fetchProductDetails} = useContext(InventoryContext);

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [comments, setComments] = useState("");
    const [currentQuantity, setCurrentQuantity] = useState("");

    const clearFields = () => {
        
        // clear the fields
        setProductId("");
        setProductName("");
        setCategory("");
        setQuantity("");
        setDescription("");
        setSelectedSupplier("");
        setComments("");
        setCurrentQuantity("");
    }
    useEffect(()=>{
        const fetchSuppliers = async () => {
            const response = await fetch('https://localhost:44348/api/Supplier');
            const data = await response.json();
            setSupplier(data.data);
        };
        fetchSuppliers();
    }, [])

    const handleProductIdChange = async (e) => {
        setProductId(e.target.value);
        if(e.target.value.length<1) {
            clearFields();
            return;
        }
        const response = await fetchProductDetails(e.target.value);
        if(response.success) {
            const productDetails = response.data;
            setProductName(productDetails.productName);
            setCategory(productDetails.category);
            setQuantity(0);
            setCurrentQuantity(productDetails.quantity);
            setDescription(productDetails.description);
        }
        else {
            alert('No product with id ' + e.target.value + ' was found!');
            clearFields();
        }
    }

    const handleSupplierChange = (e) => {
        setSelectedSupplier(e.target.value);
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }
    
    const handleCommentsChange = (e) => {
        setComments(e.target.value);
    }

    // add new stock to record
    const handleAddToStocks = (e) => {
        e.preventDefault();
        if(productId.trim()==="" || quantity<=0 || isNaN(quantity)) {
            window.alert("Please give required fields");
            return;
        }
        const newStock = {
            "employeeId": 101, //EmployeeId is hardcoded until login feature is implemented
            "productId": parseInt(productId),
            "quantity": parseInt(quantity),
            "comments": comments,
            "type": selectedSupplier ? "IN" : "ADJUST",
            "date": new Date(),
            "supplierId": selectedSupplier == null ? null : parseInt(selectedSupplier),
        }
        addStockRecord(newStock);
        clearFields();
    }

    return (
        <div className="row">
            <form className="col-4" onSubmit={handleAddToStocks}>
                <input value={productId} onChange={handleProductIdChange} type="text" className="form-control form-control-lg mb-3" placeholder="Product ID"/>
                <input value={productName} type="text" readOnly="readonly" className="form-control form-control-lg mb-3" placeholder="Product Name"/>
                <input value={category} type="text" readOnly="readonly" className="form-control form-control-lg mb-3" placeholder="Category Name"/>
                <select value={selectedSupplier} className="form-control form-control-lg custom-select custom-select-lg mb-3" onChange={handleSupplierChange}>
                    <option value="">Select Supplier</option>
                    {supplier.map(i=>(<option key={i.supplierId} value={i.supplierId}>{i.supplierName}</option>))}
                </select>
                <input value={quantity} onChange={handleQuantityChange} type="text" className="form-control form-control-lg mb-3" placeholder="Quantity"/>
                <input type="submit" className="btn btn-lg btn-success w-100 mb-3" value="Add To Stocks" />
            </form> 
            <div className="col-8 ">
                <p type="text">Current quantity: {currentQuantity}</p>
                <textarea className={"w-100 h-75 description-box "+(description?"text-dark":"text-muted")} value={description} readOnly="readonly" placeholder="Add Product ID to view product details" />
                <textarea className={"w-100 h-25 "+(comments?"text-dark":"text-muted")} value={comments} onChange={handleCommentsChange} placeholder="Leave a comment for this transaction." />
            </div>
        </div>   
    ) 
}

export default StockIn;
