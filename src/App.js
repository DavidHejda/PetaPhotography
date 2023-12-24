import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './components/Portfolio';
import About from './components/AboutComponent';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Use Routes to wrap Route components */}
        <Route path="/" element={<Home />} /> {/* Use element prop */}
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
