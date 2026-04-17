import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage' 
import CartPage from './pages/CartPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import OurWeaversPage from './pages/OurWeaversPage'
import AboutUsPage from './pages/AboutUsPage'
import FeaturedProdcutsPage from './pages/FeaturedProductsPage'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <BrowserRouter>
      <Toaster position='bottom-right' reverseOrder={false} />
      <div className="flex flex-col min-h-screen">
        <Navbar />
          <main className='flex-grow'>
            <Routes>

              <Route path='/' element={<HomePage />} />

              <Route path="/products" element={<ProductsPage />} />

              <Route path='/products/category/:slug' element={<ProductsPage />} />

              <Route path="/products/:slug" element={<ProductDetailsPage />} />

              <Route path='/products/featured' element={<FeaturedProdcutsPage />} />

              <Route path="/cart" element={<CartPage />} />

              <Route path='/meet-our-weavers' element={<OurWeaversPage />} />

              <Route path='/about-us' element={<AboutUsPage />} />

            </Routes>
          </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
