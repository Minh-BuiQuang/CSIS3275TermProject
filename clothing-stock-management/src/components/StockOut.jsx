import {useContext, useState, useEffect} from 'react';
import InventoryContext from '../Context/InventoryContext';

function StockOut() {

    const {addStockRecord, fetchProductDetails} = useContext(InventoryContext);

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
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
        setSelectedCustomer("");
        setComments("");
        setCurrentQuantity("");
    }

    useEffect(()=>{
        const fetchCustomers = async () => {
            const response = await fetch('https://localhost:44348/api/Customer');
            const data = await response.json();
            setCustomer(data.data);
        };
        fetchCustomers();
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

    const handleCustomerChange = (e) => {
        setSelectedCustomer(e.target.value);
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }
    
    const handleCommentsChange = (e) => {
        setComments(e.target.value);
    }

    const handleStockOut = (e) => {
        e.preventDefault();

        // validations
        if(productId.trim()==="" || quantity<=0 || isNaN(quantity)) {
            window.alert("Please give all necessary fields");
            return;
        }
        const employeeId = localStorage.getItem('empId');
        const newStock = {
            "employeeId": parseInt(employeeId),
            "productId": parseInt(productId),
            "quantity": parseInt(quantity) * -1,
            "comments": comments,
            "type": selectedCustomer ? "OUT" : "ADJUST",
            "date": new Date(),
            "customerId": selectedCustomer == null ? null : parseInt(selectedCustomer),
        }
        addStockRecord(newStock);
        clearFields();

    }

    return (
        <div className="row">
            <form className="col-4" onSubmit={handleStockOut}>
                <input value={productId} onChange={handleProductIdChange} type="text" className="form-control form-control-lg mb-3" placeholder="Product ID"/>
                <input value={productName} type="text" readOnly="readonly" className="form-control form-control-lg mb-3" placeholder="Product Name"/>
                <input value={category} type="text" readOnly="readonly" className="form-control form-control-lg mb-3" placeholder="Category Name"/>
                <select value={selectedCustomer} className="form-control form-control-lg custom-select custom-select-lg mb-3" onChange={handleCustomerChange}>
                    <option value="">Select Customer</option>
                    {customer.map(i=>(<option key={i.customerId} value={i.customerId}>{i.customerName}</option>))}
                </select>
                <input value={quantity} onChange={handleQuantityChange} type="text" className="form-control form-control-lg mb-3" placeholder="Quantity"/>
                <input type="submit" className="btn btn-lg btn-success w-100 mb-3" value="Stock Out" />
            </form> 
            <div className="col-8 ">
                <p type="text">Current quantity: {currentQuantity}</p>
                <textarea className={"w-100 h-75 description-box "+(description?"text-dark":"text-muted")} value={description} readOnly="readonly" placeholder="Add Product ID to view product details" />
                <textarea className={"w-100 h-25 "+(comments?"text-dark":"text-muted")} value={comments} onChange={handleCommentsChange} placeholder="Leave a comment for this transaction." />
            </div>
        </div>
    ) 
}

export default StockOut;