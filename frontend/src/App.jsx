import { Routes, Route, useLocation, } from 'react-router-dom';
import CartPage from "./pages/CartPage"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import ProductPage from "./pages/ProductPage"
import RegisterPage from "./pages/RegisterPage"
import Header from './components/Header';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Shop from './pages/Shop';



function App() {

  const location = useLocation();
  const shouldShowFooter = !['/login', '/register'].includes(location.pathname);
  return (
    <>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
      </Routes>

      {shouldShowFooter && <Footer />}


    </>
  )
}

export default App
