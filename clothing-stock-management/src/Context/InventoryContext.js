import { createContext, useEffect, useState } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({children}) => {
    const [stockRecords, setStockRecords] = useState([]);

    useEffect(()=>{
        fetchStockRecords();
    }, []);

    const fetchStockRecords = async () => {
        const response = await fetch('https://localhost:44348/api/Stock');
        const data = await response.json();
        setStockRecords(data);
    }

    const addStockRecord = async (newRecord) => {
        const response = await fetch('https://localhost:44348/api/Stock/StockDetail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecord)
        })

        const data = await response.json();
        if(data.success)
            window.alert("Stock Updated");
        else
            window.alert("Stock Update failed. Please check your connection!");
            
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
        const records = await fetch('https://localhost:44348/api/Product/'+ productId);
        const data = await records.json();
        return data;
    }

    return (
        <InventoryContext.Provider value={{stockRecords, addStockRecord, fetchProductDetails, stockOutProduct}}>{children}</InventoryContext.Provider>
    )
}

export default InventoryContext;

