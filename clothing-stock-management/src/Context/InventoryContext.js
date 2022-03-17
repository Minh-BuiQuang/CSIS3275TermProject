import { createContext, useEffect, useState } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(()=>{
        fetchProducts();
        fetchCustomers();
        fetchSuppliers();
        fetchTransactions();
    }, []);

    // Get current products
    const fetchProducts = async () => {
        const response = await fetch('https://localhost:44348/api/Product');
        const data = await response.json();
        setProducts(data);
    }

    // get customers
    const fetchCustomers = async () => {
        const response = await fetch('https://localhost:44348/api/Customer');
        const data = await response.json();
        setCustomers(data.data);
    };

    const fetchSuppliers = async () => {
        const response = await fetch('https://localhost:44348/api/Supplier');
        const data = await response.json();
        setSuppliers(data.data);
    };

    const fetchTransactions = async () => {
        const response = await fetch('https://localhost:44348/api/Stock');
        const data = await response.json();
        setTransactions(data.data);
    }









    const addTransactionRecord = async (newRecord) => {
        const response = await fetch('https://localhost:44348/api/Stock/stockDetail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecord)
        })

        const data = await response.json();
        // setStockRecords([data, ...stockRecords]);
    }

    const stockOutProduct = async (updatedRecord) => {
        const response = await fetch('/stocks?productId='+updatedRecord.productId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRecord)
        });

        const data = await response.json();
        // setStockRecords([data, ...stockRecords]);
    }

    const fetchProductDetails = (productId) => {
        return products.data.filter(product=>product.productId == productId)[0];
    }

    return (
        <InventoryContext.Provider value={{transactions, products, stockOutProduct, addTransactionRecord, fetchProductDetails}}>{children}</InventoryContext.Provider>
    )
}

export default InventoryContext;

