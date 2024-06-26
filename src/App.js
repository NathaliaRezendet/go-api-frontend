import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../src/components/css/App.css';
import Clients from './components/Clients';
import Benefits from './components/Benefits';
import Billing from './components/Billing';
import Partner from './components/Partner';
import Product from './components/Product';
import ResourceUsages from './components/Resource_usage';
import Subscription from './components/Subscription';

const TopicLink = ({ to, children }) => (
  <Link to={to} className="topic">
    {children}
  </Link>
);

const Home = () => (
  <div className="topics-container">
    <div className="topic-grid">
      <TopicLink to="/clients">Clientes</TopicLink>
      <TopicLink to="/benefits">Benefícios</TopicLink>
      <TopicLink to="/billing">Pagamentos</TopicLink>
      <TopicLink to="/partner">Parceiros</TopicLink>
      <TopicLink to="/product">Produtos</TopicLink>
      <TopicLink to="/resource-usages">Uso de recursos</TopicLink>
      <TopicLink to="/subscription">Inscrições</TopicLink>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/product" element={<Product />} />
          <Route path="/resource-usages" element={<ResourceUsages />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes> 
      </div>
    </Router>
  );
};

export default App;