import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const HashPage = () => {
    const [inputText, setInputText] = useState('');
    const [hashAlgorithm, setHashAlgorithm] = useState('SHA256');
    const [inputFormat, setInputFormat] = useState('UTF-8');
    const [outputFormat, setOutputFormat] = useState('Hex');
    const [hashResult, setHashResult] = useState('');
    const [autoUpdate, setAutoUpdate] = useState(true); // Add state for auto update

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleAlgorithmChange = (e) => {
        setHashAlgorithm(e.target.value);
    };

    const handleInputFormatChange = (e) => {
        setInputFormat(e.target.value);
    };

    const handleOutputFormatChange = (e) => {
        setOutputFormat(e.target.value);
    };

    const handleGenerateHash = () => {
        let result;
        let formattedInput = inputText;

        if (inputFormat === 'Base64') {
            try{
                formattedInput = CryptoJS.enc.Base64.parse(inputText).toString(CryptoJS.enc.Utf8);
            }catch(e){
                setHashResult(e);
                return;
            }
        }


        switch (hashAlgorithm) {
            case 'SHA256':
                result = CryptoJS.SHA256(formattedInput);
                break;
            case 'SHA1':
                result = CryptoJS.SHA1(formattedInput);
                break;
            case 'MD5':
                result = CryptoJS.MD5(formattedInput);
                break;
            default:
                result = '';
        }

        if (outputFormat === 'Base64') {
            setHashResult(result.toString(CryptoJS.enc.Base64));
        } else {
            setHashResult(result.toString(CryptoJS.enc.Hex));
        }
    };

    const toggleAutoUpdate = () => {
        setAutoUpdate(!autoUpdate);
    };

    // Automatically generate hash when input text changes if autoUpdate is enabled
    useEffect(() => {
        if (autoUpdate && inputText) {
            handleGenerateHash();
        }
    }, [inputText, autoUpdate]); // Dependency array includes autoUpdate

    return (
        <div className="container">
            <h1>Hash Generator</h1>
            <div className="grid-row">
                <label htmlFor="inputText">Enter Text:</label>
                <input
                    type="text"
                    id="inputText"
                    value={inputText}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter text to hash"
                />
            </div>

            <div className="grid-row">
                <label htmlFor="hashAlgorithm">Choose Hash Algorithm:</label>
                <select id="hashAlgorithm" value={hashAlgorithm} onChange={handleAlgorithmChange} className="input-field">
                    <option value="SHA256">SHA-256</option>
                    <option value="SHA1">SHA-1</option>
                    <option value="MD5">MD5</option>
                </select>
            </div>

            <div className="grid-row">
                <label htmlFor="inputFormat">Choose Input Format Of Text:</label>
                <select id="inputFormat" value={inputFormat} onChange={handleInputFormatChange} className="input-field">
                    <option value="UTF-8">UTF-8</option>
                    <option value="Base64">Base64</option>
                </select>
            </div>

            <div className="grid-row">
                <label htmlFor="outputFormat">Choose Output Format Of Text:</label>
                <select id="outputFormat" value={outputFormat} onChange={handleOutputFormatChange} className="input-field">
                    <option value="Hex">Hex</option>
                    <option value="Base64">Base64</option>
                </select>
            </div>

            <div className="grid-row">
                <button className="btn" onClick={handleGenerateHash}>Generate Hash</button>
            </div>

            <div className="grid-row">
                <label htmlFor="autoUpdate" className="switch">
                    Auto Update
                    <input
                        type="checkbox"
                        id="autoUpdate"
                        checked={autoUpdate}
                        onChange={toggleAutoUpdate}
                    />
                    <span className="slider round"></span>
                </label>
            </div>

            {hashResult && (
                <div className="grid-row">
                    <h4>Hash Result:</h4>
                    <textarea value={hashResult} readOnly className="input-field" rows="5" />
                </div>
            )}
        </div>
    );
};

export default HashPage;
