import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartupPage from './StartupPage';
import EncryptionDecryptionPage from './EncryptionDecryptionPage';
import HashesPage from './HashesPage';
import EncodingDecodingPage from './EncodingDecodingPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartupPage />} />
        <Route path="/encryption-decryption" element={<EncryptionDecryptionPage />} />
        <Route path="/hashes" element={<HashesPage />} />
        <Route path="/encoding-decoding" element={<EncodingDecodingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
