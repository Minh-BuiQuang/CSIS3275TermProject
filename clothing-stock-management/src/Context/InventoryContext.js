import { createContext, useEffect, useState } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({children}) => {
    const [stockRecords, setStockRecords] = useState([]);
    // const [currentStocks, setCurrentStocks] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(()=>{
        fetchStockRecords();
    }, []);

    useEffect(()=>{
        fetchCustomers();
    }, [])

    const fetchStockRecords = async () => {
        const response = await fetch('https://localhost:44348/Product');
        const data = await response.json();
        setStockRecords(data);
    }

    const addStockRecord = async (newRecord) => {
        const response = await fetch('/stocks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecord)
        })

        const data = await response.json();
        setStockRecords([data, ...stockRecords]);
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
        setStockRecords([data, ...stockRecords]);
    }

    const fetchProductDetails =  async (productId) => {
        const records = await fetch('/stocks?productId='+productId);
        const data = await records.json();
        return data;
    }

    const fetchSuppliers = async () => {
        const response = await fetch('https://localhost:44348/api/Supplier');
        const data = await response.json();
        return data.data;
    }

    const fetchCustomers = async () => {
        const response = await fetch('https://localhost:44348/api/Customer');
        const data = await response.json();
        // console.log(data);
        setCustomers(data.data);
    }

    return (
        <InventoryContext.Provider value={{stockRecords, customers, addStockRecord, fetchProductDetails, stockOutProduct, fetchSuppliers}}>{children}</InventoryContext.Provider>
    )
}

export default InventoryContext;

