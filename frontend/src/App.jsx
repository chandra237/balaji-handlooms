import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage' 
import CartPage from './pages/CartPage'
import OurWeaversPage from './pages/OurWeaversPage'
import AboutUsPage from './pages/AboutUsPage'
import FeaturedProdcutsPage from './pages/FeaturedProductsPage'
import toast, { Toaster } from 'react-hot-toast'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import { useState } from 'react'
import AuthModal from './components/AuthModal'
import { useAuth } from './context/authContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './admin/AdminLayout'
import AdminProductListPage from './pages/AdminProductListPage'
import AdminAddProductPage from './pages/AdminAddProductPage'
import PublicLayout from './layouts/PublicLayout'
import AdminEditProductPage from './pages/AdminEditProductPage'
import AdminProtectedRoute from './components/AdminProtectedRoute'


function App() {

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const { isLoggedIn } = useAuth();

  const requireAuth = (action) => {

    if (!isLoggedIn) {
      setShowAuthModal(true);
      setPendingAction(() => action);
      return false;
    }
    action();
    return true;
  }

  return (
    <BrowserRouter>
      <Toaster position='bottom-right' reverseOrder={false} />
      
            <Routes>
              <Route element={<PublicLayout showAuthModal={() => setShowAuthModal(true)} />} >
              
                <Route path='/' element={<HomePage />} />

                <Route path="/products" element={<ProductsPage />} />

                <Route path='/products/category/:slug' element={<ProductsPage />} />

                <Route path="/products/:slug" element={<ProductDetailsPage />} />

                <Route path='/products/featured' element={<FeaturedProdcutsPage />} />

                <Route path="/cart" element={<CartPage requireAuth={requireAuth} />} />

                <Route path='/meet-our-weavers' element={<OurWeaversPage />} />

                <Route path='/about-us' element={<AboutUsPage />} />

                <Route path='/checkout' element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } />

                <Route path='/order-success/:orderId' element={
                  <ProtectedRoute>
                    <OrderSuccessPage />
                  </ProtectedRoute>
                }/>

                <Route path='/orders' element={
                  <ProtectedRoute>
                    <OrderHistoryPage />
                  </ProtectedRoute>
                } />

                <Route path='/orders/:orderId' element={
                  <ProtectedRoute>
                    <OrderDetailsPage />
                  </ProtectedRoute>
                } />
              </Route>


              <Route path='/admin' element={
                <AdminProtectedRoute>
                  <AdminLayout showAuthModal={() => setShowAuthModal(true)} />
                </AdminProtectedRoute>
              } >
                <Route path='products' element={<AdminProductListPage />} />
                <Route path='products/add' element={<AdminAddProductPage />} />
                <Route path='products/:id' element={<AdminEditProductPage />} />
              </Route>

            </Routes>
          

        {showAuthModal && (
          <AuthModal 
                onClose={() => setShowAuthModal(false)}
                onSuccess={() => {
                  setShowAuthModal(false);

                  if(pendingAction){
                    pendingAction();
                    setPendingAction(null);
                  }
                }}
          />
        )}
    </BrowserRouter>
  )
}

export default App
