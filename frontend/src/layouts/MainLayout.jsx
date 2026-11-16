import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}
