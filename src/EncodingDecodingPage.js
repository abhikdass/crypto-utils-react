import React, { useState, useCallback } from 'react';
import CryptoJS from 'crypto-js';

const EncodingDecodingPage = () => {
    const [inputText, setInputText] = useState('');
    const [fromFormat, setFromFormat] = useState('UTF-8');
    const [toFormat, setToFormat] = useState('UTF-8');
    const [conversionResult, setConversionResult] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleFromFormatChange = (e) => {
        setFromFormat(e.target.value);
    };

    const handleToFormatChange = (e) => {
        setToFormat(e.target.value);
    };

    const convertToBinary = (text) => {
        return text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
    };

    const convertFromBinary = (binary) => {
        return binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
    };

    const handleConvertFormat = useCallback(() => {
        try {
            let result;

            if (fromFormat === 'UTF-8') {
                if (toFormat === 'Base64') {
                    result = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(inputText));
                } else if (toFormat === 'Hex') {
                    result = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(inputText));
                } else if (toFormat === 'Binary') {
                    result = convertToBinary(inputText);
                } else {
                    result = inputText; // If both formats are the same
                }
            } else if (fromFormat === 'Base64') {
                const parsedInput = CryptoJS.enc.Base64.parse(inputText).toString(CryptoJS.enc.Utf8);
                if (toFormat === 'UTF-8') {
                    result = parsedInput;
                } else if (toFormat === 'Hex') {
                    result = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(parsedInput));
                } else if (toFormat === 'Binary') {
                    result = convertToBinary(parsedInput);
                } else {
                    result = inputText; // If both formats are the same
                }
            } else if (fromFormat === 'Hex') {
                const parsedInput = CryptoJS.enc.Hex.parse(inputText).toString(CryptoJS.enc.Utf8);
                if (toFormat === 'UTF-8') {
                    result = parsedInput;
                } else if (toFormat === 'Base64') {
                    result = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(parsedInput));
                } else if (toFormat === 'Binary') {
                    result = convertToBinary(parsedInput);
                } else {
                    result = inputText; // If both formats are the same
                }
            } else if (fromFormat === 'Binary') {
                const parsedInput = convertFromBinary(inputText);
                if (toFormat === 'UTF-8') {
                    result = parsedInput;
                } else if (toFormat === 'Base64') {
                    result = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(parsedInput));
                } else if (toFormat === 'Hex') {
                    result = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(parsedInput));
                } else {
                    result = inputText; // If both formats are the same
                }
            }

            setConversionResult(result);
        } catch (error) {
            setConversionResult(`Error: ${error.message}`);
        }
    }, [inputText, fromFormat, toFormat]);

    return (
        <div className="container">
            <h1>Encoding/Decoding</h1>
            <div className="grid-row">
                <label htmlFor="inputText">Enter Text:</label>
                <input
                    type="text"
                    id="inputText"
                    value={inputText}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter text to convert"
                />
            </div>

            <div className="grid-row">
                <label htmlFor="fromFormat">From Format:</label>
                <select id="fromFormat" value={fromFormat} onChange={handleFromFormatChange} className="input-field">
                    <option value="UTF-8">UTF-8</option>
                    <option value="Base64">Base64</option>
                    <option value="Hex">Hex</option>
                    <option value="Binary">Binary</option>
                </select>
            </div>

            <div className="grid-row">
                <label htmlFor="toFormat">To Format:</label>
                <select id="toFormat" value={toFormat} onChange={handleToFormatChange} className="input-field">
                    <option value="UTF-8">UTF-8</option>
                    <option value="Base64">Base64</option>
                    <option value="Hex">Hex</option>
                    <option value="Binary">Binary</option>
                </select>
            </div>

            <div className="grid-row">
                <button className="btn" onClick={handleConvertFormat}>Convert Format</button>
            </div>

            {conversionResult && (
                <div className="grid-row">
                    <h4>Conversion Result:</h4>
                    <textarea value={conversionResult} readOnly className="input-field" rows="5" />
                </div>
            )}
        </div>
    );
};

export default EncodingDecodingPage;
