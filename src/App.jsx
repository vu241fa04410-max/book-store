
import React, { useEffect } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  Link
} from 'react-router-dom';

import { ArrowRight, X } from 'lucide-react';

import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { HomePage } from './pages/HomePage';
import { BooksPage } from './pages/BooksPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { CheckoutPage } from './pages/CheckoutPage';

// Scroll to top whenever the page changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Cart notification
function CartToast() {
  const { lastAddedBook, clearLastAdded } = useCart();

  if (!lastAddedBook) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#15271F] text-amber-50 rounded-xl shadow-2xl p-4 border border-[#2B4B3C] flex items-center gap-4 max-w-sm">

        <img
          src={lastAddedBook.coverImage}
          alt={lastAddedBook.title}
          referrerPolicy="no-referrer"
          className="w-10 h-14 object-cover rounded shadow-2xs border border-white/20 shrink-0"
        />

        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase font-mono tracking-wider text-amber-300/90 font-medium">
            Added to Bag
          </p>

          <h4 className="font-serif font-bold text-xs sm:text-sm text-white truncate">
            {lastAddedBook.title}
          </h4>

          <p className="text-xs text-stone-300 font-mono">
            ₹{lastAddedBook.price}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/cart"
            onClick={clearLastAdded}
            className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-[#15271F] font-semibold text-xs rounded-md transition-colors flex items-center gap-1"
          >
            <span>View</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <button
            onClick={clearLastAdded}
            className="p-1 text-stone-400 hover:text-white transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

// Main application layout
function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E232A]">

      <ScrollToTop />

      <Navbar />

      <main className="flex-1">
        <Routes>

          <Route path="/" element={<HomePage />} />

          <Route path="/books" element={<BooksPage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<SignUpPage />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<HomePage />} />

        </Routes>
      </main>

      <Footer />

      <CartToast />

    </div>
  );
}

// Root application
export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  );
}
