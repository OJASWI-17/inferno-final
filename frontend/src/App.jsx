import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup"; 
import Landing from "./Pages/Landing";
import Stocklist from "./Pages/Stocklist";
import StockChart from "./Pages/StockChart";
import Navbar from "./components/Navbar";
import Portfolio from "./Pages/Portfolio";
import StarBackground from "./components/StarBackground";
import Dashboard from "./Pages/Dashboard";
import OrderHistory from "./Pages/OrderHistory";
import Leaderboard from "./Pages/Leaderboard";
// import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <StarBackground /> 
      {/* <Layout /> */}
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Landing />} />
        <Route path="/stocklist" element={<Stocklist />} />
        <Route path="/stockchart" element={<StockChart />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/leaderboard" element={<Leaderboard />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
