import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from "./pages/CartPage"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import ProductPage from "./pages/ProductPage"
import RegisterPage from "./pages/RegisterPage"
import Header from './components/Header';
import Footer from './components/Footer';



function App() {
  

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </Router>
      
    </>
  )
}

export default App
