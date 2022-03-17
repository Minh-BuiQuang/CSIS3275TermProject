import {useContext, useState} from 'react';
import InventoryContext from '../Context/InventoryContext';

function StockIn() {

    const {addTransactionRecord, products, fetchProductDetails} = useContext(InventoryContext);

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");

    const handleProductIdChange = async (e) => {
        setProductId(e.target.value);
        const productDetails = fetchProductDetails(e.target.value);
        console.log(productDetails);
        if(productDetails) {
            setProductName(productDetails.productName);
            // setCategory([...new Set(productDetails.map(i=>i.category))]);
            // setSupplier([...new Set(productDetails.map(i=>i.supplier))]);
            setQuantity(0);
            setDescription(productDetails.description);
        }
    } 

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
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

    // add new stock to record
    const handleAddToStocks = (e) => {
        e.preventDefault();
        // if(!productId ||
        //    !category.includes(selectedCategory) ||
        //    !supplier.includes(selectedSupplier) || 
        //    quantity<=0) {
        //        window.alert("Please give required fields");
        //     return;
        // }
        const newStock = {
            "productName": productName,
            "productId": productId,
            "category": selectedCategory, 
            "supplier": selectedSupplier,  
            "quantity": quantity,
            "description": description
        }
        const a = {
            "employeeId": 0,
            "productId": 100,
            "quantity": 100,
            "date": "2022-03-16T07:07:40.512Z",
            "comments": "string",
            "type": "Stock out",
            "supplierId": 3,
            "customerId": 1
          }
        console.log(a);
        addTransactionRecord(a);

        // clear the fields
        setProductId("");
        setProductName("");
        setCategory([]);
        setSupplier([]);
        setQuantity("");
        setDescription("");
        setSelectedCategory("");
        setSelectedSupplier("");

        window.alert("Stock Updated");
    }

    return (
        <div className="row">
            <form className="col-4" onSubmit={handleAddToStocks}>
                <input value={productId} onChange={handleProductIdChange} type="text" className="form-control form-control-lg mb-3" placeholder="Product ID"/>
                <input value={productName} onChange={handleProductNameChange} type="text" className="form-control form-control-lg mb-3" placeholder="Product Name"/>
                <select className="form-control form-control-lg custom-select custom-select-lg mb-3" onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    {category.map(i=>(<option key={i} value={i}>{i}</option>))}
                </select>
                <select className="form-control form-control-lg custom-select custom-select-lg mb-3" onChange={handleSupplierChange}>
                    <option value="">Select Supplier</option>
                    {supplier.map(i=>(<option key={i} value={i}>{i}</option>))}
                </select>
                <input value={quantity} onChange={handleQuantityChange} type="text" className="form-control form-control-lg mb-3" placeholder="Quantity"/>
                <input type="submit" className="btn btn-lg btn-success w-100 mb-3" value="Add To Stocks" />
            </form> 
            <div className="col-8 ">
                <textarea className={"w-100 h-100 description-box "+(description?"text-dark":"text-muted")} onChange={handleDescriptionChange} value={description} placeholder="Add Product ID to view product details" />
            </div>
        </div>   
    ) 
}

export default StockIn;