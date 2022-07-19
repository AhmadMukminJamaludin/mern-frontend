import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import InputUser from "./pages/InputUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="flex justify-center">
          <Routes>
            <Route path="/" element={<Card />} />
            <Route path="/add-user" element={<InputUser />} />
            <Route path="/edit-user/:_id" element={<EditUser />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
