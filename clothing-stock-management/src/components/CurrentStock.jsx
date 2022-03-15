import {useEffect, useState } from "react";

function CurrentStock() {

    const [currentStocks, setCurrentStocks] = useState([]);

    useEffect(()=>{
        const fetchCurrentStocks = async () => {
            const response = await fetch('https://localhost:44348/api/Product');
            const data = await response.json();
            setCurrentStocks(data.data);
        }
        fetchCurrentStocks();
    }, [])

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope='col'>Product Name</th>
                    <th scope='col'>Product ID</th>
                    <th scope='col'>Category</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Size</th>
                    <th scope='col'>Description</th>
                </tr>
            </thead>
            <tbody>
                {currentStocks.map(d=>(<tr key={d.productId}>
                    <td>{d.productId}</td>
                    <td>{d.productName}</td>
                    <td>{d.category}</td>
                    <td>{d.quantity}</td>
                    <td>{d.size}</td>
                    <td>{d.description}</td>
                </tr>))}
            </tbody>
        </table>
    )
}

export default CurrentStock;

/*
category: "Others"
description: "One of Prada's most functional designs, this belt bag is made from weather-resistant shell fabric with zip compartments for storing your daily belongings. It's designed for navigating your day hands-free- try styling yours diagonally across the body."
productId: 1
productName: "Prada Striped Shell Belt Bag"
quantity: 16
size: "XS"
*/