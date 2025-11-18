
import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header, Footer } from './components';
import { HomePage, QuotePage, TrackPage, ServicesPage, AboutPage, ContactPage } from './pages';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="quote" element={<QuotePage />} />
          <Route path="track" element={<TrackPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
