import React from 'react';
import { Link } from 'react-router-dom';

const StartupPage = () => {
  return (
    <div className="container">
      <h1>Welcome to Crypto Utils</h1>
      <h3>Select an Option:</h3>

      <div className="grid-row">
        <Link to="/encryption-decryption">
          <button className="btn">Encryptions / Decryption</button>
        </Link>
      </div>

      <div className="grid-row">
        <Link to="/hashes">
          <button className="btn">Hashes</button>
        </Link>
      </div>

      <div className="grid-row">
        <Link to="/encoding-decoding">
          <button className="btn">Encoding / Decoding</button>
        </Link>
      </div>
    </div>
  );
};

export default StartupPage;
