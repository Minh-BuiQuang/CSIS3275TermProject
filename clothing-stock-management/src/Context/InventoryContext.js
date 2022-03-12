import { createContext, useEffect, useState } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({children}) => {
    const [stockRecords, setStockRecords] = useState([]);
    const [currentStocks, setCurrentStocks] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(()=>{
        fetchStockRecords();
    }, []);

    useEffect(()=>{
        fetchCurrentStocks();
    }, [])

    useEffect(()=>{
        fetchSuppliers();
    }, [])

    useEffect(()=>{
        fetchCustomers();
    }, [])

    const fetchStockRecords = async () => {
        const response = await fetch('/stock-records');
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
        const response = await fetch('/suppliers');
        const data = await response.json();
        setSuppliers(data);
    }

    const fetchCustomers = async () => {
        const response = await fetch('/customers');
        const data = await response.json();
        setCustomers(data);
    }

    const fetchCurrentStocks = async () => {
        const response = await fetch('/stocks');
        const data = await response.json();
        setCurrentStocks(data);
    }

    return (
        <InventoryContext.Provider value={{stockRecords, currentStocks, suppliers, customers, addStockRecord, fetchProductDetails, stockOutProduct}}>{children}</InventoryContext.Provider>
    )
}

export default InventoryContext;