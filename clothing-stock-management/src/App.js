import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {InventoryProvider} from "./Context/InventoryContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import StockRecords from "./components/StockRecords";
import StockIn from "./components/StockIn";
import StockOut from "./components/StockOut";
import EntityList from "./components/EntityList";
import CurrentStock from "./components/CurrentStock";
import Login from "./components/Login";
import Customers from "./components/Customers";
import Suppliers from "./components/Suppliers";
import { useState } from "react";

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  // if(!authenticated) {
  //   return (
  //     <>
  //       <Login setAuthenticated={setAuthenticated} />
  //       <Footer />
  //     </>
  //   )
  // }

  return (
    <InventoryProvider>
      <Router>
        {/* {!authenticated ? <Login setAuthenticated={setAuthenticated} />: (<> */}
        <Header />
          <div className='container mt-2'>
            <Routes>
              <Route exact path="/" element={<StockRecords />} />
              <Route exact path="/stock-in" element={<StockIn />} />
              <Route exact path="/stock-out" element={<StockOut />} />
              <Route exact path="/suppliers" element={<Suppliers />} />
              <Route exact path="/customers" element={<Customers />} />
              <Route exact path="/current-stock" element={<CurrentStock />} />
            </Routes>
          </div>
          {/* </>)} */}
        <Footer />
      </Router>
    </InventoryProvider>
  );
}

export default App;
