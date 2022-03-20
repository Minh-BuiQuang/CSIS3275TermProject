import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {InventoryProvider} from "./Context/InventoryContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StockRecords from "./components/StockRecords";
import StockIn from "./components/StockIn";
import StockOut from "./components/StockOut";
import CurrentStock from "./components/CurrentStock";
import Login from "./components/Login";
import Customers from "./components/Customers";
import Suppliers from "./components/Suppliers";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const log = () => {
    localStorage.getItem('authenticated') ? 
      setAuthenticated(true) : setAuthenticated(false);
  }
  

  return (
    <InventoryProvider>
      <Router>
        {authenticated ? <Header log={log} /> : <></>}
          <div className='container mt-2'>
            <Routes>
              <Route exact path="/" element={<Login log={log} />} />
              <Route element={<ProtectedRoute authenticated={authenticated} />}>
                <Route exact path="/stock-records" element={<StockRecords />} />
                <Route exact path="/stock-in" element={<StockIn />} />
                <Route exact path="/stock-out" element={<StockOut />} />
                <Route exact path="/suppliers" element={<Suppliers />} />
                <Route exact path="/customers" element={<Customers />} />
                <Route exact path="/current-stock" element={<CurrentStock />} />
              </Route>
            </Routes>
          </div>
        <Footer />
      </Router>
    </InventoryProvider>
  );
}

export default App;
