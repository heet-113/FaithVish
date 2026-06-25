import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useStore from './store/useStore';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import AffiliateDisclosureBanner from './components/AffiliateDisclosureBanner';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoriesPage from './pages/CategoriesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import TopRingsPage from './pages/TopRingsPage';
import GiftingGuidePage from './pages/GiftingGuidePage';
import AffiliateDisclosurePage from './pages/AffiliateDisclosurePage';
import BuyingGuidePage from './pages/BuyingGuidePage';
import JewelleryCareGuidePage from './pages/JewelleryCareGuidePage';
import BlogListingPage from './pages/BlogListingPage';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  const { activeGender } = useStore();
  const isMen = activeGender === 'men';

  return (
    <Router>
      <ScrollToTop />
      <div
        className="min-h-screen flex flex-col"
        data-theme={activeGender}
        style={{
          backgroundColor: isMen ? '#1E1E20' : 'var(--color-surface)',
          transition: 'background-color 0.4s ease',
        }}
      >
        <AffiliateDisclosureBanner />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/categories/:category" element={<CategoriesPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/top-rings-under-1000" element={<TopRingsPage />} />
            <Route path="/gifting-guide" element={<GiftingGuidePage />} />
            <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />
            <Route path="/buying-guide" element={<BuyingGuidePage />} />
            <Route path="/jewellery-care-guide" element={<JewelleryCareGuidePage />} />
            <Route path="/blog" element={<BlogListingPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
