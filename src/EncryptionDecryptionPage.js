import React, { useState, useCallback } from 'react';
import CryptoJS from 'crypto-js';

const EncryptionDecryptionPage = () => {
    const [inputText, setInputText] = useState('');
    const [inputFormat, setInputFormat] = useState('UTF-8');
    const [algorithm, setAlgorithm] = useState('AES CBC 128');
    const [key, setKey] = useState('');
    const [keyFormat, setKeyFormat] = useState('UTF-8');
    const [iv, setIv] = useState('');
    const [ivFormat, setIvFormat] = useState('UTF-8');
    const [operation, setOperation] = useState('Encryption');
    const [result, setResult] = useState('');

    const handleInputChange = (e) => setInputText(e.target.value);
    const handleKeyChange = (e) => setKey(e.target.value);
    const handleIvChange = (e) => setIv(e.target.value);
    const handleAlgorithmChange = (e) => setAlgorithm(e.target.value);
    const handleInputFormatChange = (e) => setInputFormat(e.target.value);
    const handleKeyFormatChange = (e) => setKeyFormat(e.target.value);
    const handleIvFormatChange = (e) => setIvFormat(e.target.value);
    const handleOperationChange = (e) => setOperation(e.target.value);

    const handleSubmit = useCallback(() => {
        try {
            let parsedInput = inputText;
            let parsedKey = key;
            let parsedIv = iv;
    
            // Convert input based on selected format
            if (inputFormat === 'Base64') {
                parsedInput = CryptoJS.enc.Base64.parse(inputText).toString(CryptoJS.enc.Utf8);
            } else if (inputFormat === 'Hex') {
                parsedInput = CryptoJS.enc.Hex.parse(inputText).toString(CryptoJS.enc.Utf8);
            }
    
            // Convert key based on selected format
            if (keyFormat === 'Base64') {
                parsedKey = CryptoJS.enc.Base64.parse(key).toString(CryptoJS.enc.Utf8);
            } else if (keyFormat === 'Hex') {
                parsedKey = CryptoJS.enc.Hex.parse(key).toString(CryptoJS.enc.Utf8);
            }
    
            // Convert IV based on selected format
            if (ivFormat === 'Base64' && iv) {
                parsedIv = CryptoJS.enc.Base64.parse(iv).toString(CryptoJS.enc.Utf8);
            } else if (ivFormat === 'Hex' && iv) {
                parsedIv = CryptoJS.enc.Hex.parse(iv).toString(CryptoJS.enc.Utf8);
            }
    
            let output;
            if (operation === 'Encryption') {
                if (algorithm.startsWith('AES')) {
                    const mode = algorithm.split(' ')[1];
    
                    const options = {
                        mode: mode === 'CBC' ? CryptoJS.mode.CBC : CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7,
                        iv: parsedIv ? parsedIv : undefined
                    };
    
                    output = CryptoJS.AES.encrypt(parsedInput, CryptoJS.enc.Utf8.parse(parsedKey), options).toString();
                } else if (algorithm.startsWith('DES')) {
                    const mode = algorithm.split(' ')[1];
                    const options = {
                        mode: mode === 'CBC' ? CryptoJS.mode.CBC : CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7,
                        iv: parsedIv ? parsedIv : undefined
                    };
    
                    output = CryptoJS.DES.encrypt(parsedInput, CryptoJS.enc.Utf8.parse(parsedKey), options).toString();
                }
            } else {
                if (algorithm.startsWith('AES')) {
                    const mode = algorithm.split(' ')[1];
    
                    const options = {
                        mode: mode === 'CBC' ? CryptoJS.mode.CBC : CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7,
                        iv: parsedIv ? parsedIv : undefined
                    };
    
                    output = CryptoJS.AES.decrypt(parsedInput, CryptoJS.enc.Utf8.parse(parsedKey), options).toString(CryptoJS.enc.Utf8);
                } else if (algorithm.startsWith('DES')) {
                    const mode = algorithm.split(' ')[1];
    
                    const options = {
                        mode: mode === 'CBC' ? CryptoJS.mode.CBC : CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7,
                        iv: parsedIv ? parsedIv : undefined
                    };
    
                    output = CryptoJS.DES.decrypt(parsedInput, CryptoJS.enc.Utf8.parse(parsedKey), options).toString(CryptoJS.enc.Utf8);
                }
            }
    
            setResult(output);
        } catch (error) {
            setResult(`There is the some bug I will fix later on`);
        }
    }, [inputText, inputFormat, algorithm, key, keyFormat, iv, ivFormat, operation]);
    
    return (
        <div className="container">
            <h1>Encryption/Decryption </h1>
            <div className="grid-row">
                <label htmlFor="inputText">Input Text:</label>
                <input
                    type="text"
                    id="inputText"
                    value={inputText}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter text to encrypt/decrypt"
                />
                <select id="inputFormat" value={inputFormat} onChange={handleInputFormatChange} className="input-field">
                    <option value="UTF-8">UTF-8</option>
                    <option value="Base64">Base64</option>
                    <option value="Hex">Hex</option>
                </select>
            </div>

            <div className="grid-row">
                <label htmlFor="algorithm">Algorithm:</label>
                <select id="algorithm" value={algorithm} onChange={handleAlgorithmChange} className="input-field">
                    <option value="AES CBC 128">AES CBC 128</option>
                    <option value="AES CBC 192">AES CBC 192</option>
                    <option value="AES CBC 256">AES CBC 256</option>
                    <option value="AES ECB 128">AES ECB 128</option>
                    <option value="AES ECB 192">AES ECB 192</option>
                    <option value="AES ECB 256">AES ECB 256</option>
                    <option value="DES CBC 128">DES CBC 128</option>
                    <option value="DES CBC 192">DES CBC 192</option>
                    <option value="DES CBC 256">DES CBC 256</option>
                    <option value="DES ECB 128">DES ECB 128</option>
                    <option value="DES ECB 192">DES ECB 192</option>
                    <option value="DES ECB 256">DES ECB 256</option>
                </select>
            </div>

            <div className="grid-row">
                <label htmlFor="key">Key:</label>
                <input
                    type="text"
                    id="key"
                    value={key}
                    onChange={handleKeyChange}
                    className="input-field"
                    placeholder="Enter encryption key"
                />
                <select id="keyFormat" value={keyFormat} onChange={handleKeyFormatChange} className="input-field">
                    <option value="UTF-8">UTF-8</option>
                    <option value="Base64">Base64</option>
                    <option value="Hex">Hex</option>
                </select>
            </div>

            <div className="grid-row">
                <label htmlFor="iv">IV (Optional):</label>
                <input
                    type="text"
                    id="iv"
                    value={iv}
                    onChange={handleIvChange}
                    className="input-field"
                    placeholder="Enter IV (if needed)"
                />
                <select id="ivFormat" value={ivFormat} onChange={handleIvFormatChange} className="input-field">
                    <option value="UTF-8">UTF-8</option>
                    <option value="Base64">Base64</option>
                    <option value="Hex">Hex</option>
                </select>
            </div>

            <div className="grid-row">
                <label htmlFor="operation">Operation:</label>
                <select id="operation" value={operation} onChange={handleOperationChange} className="input-field">
                    <option value="Encryption">Encryption</option>
                    <option value="Decryption">Decryption</option>
                </select>
            </div>

            <div className="grid-row">
                <button className="btn" onClick={handleSubmit}>Submit</button>
            </div>

            {result && (
                <div className="grid-row">
                    <h4>Result:</h4>
                    <textarea value={result} readOnly className="input-field" rows="5" />
                </div>
            )}
        </div>
    );
};

export default EncryptionDecryptionPage;
