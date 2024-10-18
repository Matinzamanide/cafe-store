import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Product from "./components/product/product";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
