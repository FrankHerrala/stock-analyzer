import "./App.css";
import React, { useState, useEffect } from "react";
import CsvParser from "./CsvParser.js";
import Analyser from "./Analyser.js";

function App() {
    const [stockHistory, setStockHistory] = useState(null);
    const [fileName, setFileName] = useState("");

    function onFileUpload(e) {
        CsvParser(e.target.files[0], setStockHistory);
        setFileName(e.target.files[0].name);
    }

    return (
        <div className="App">
            <header>Stock analyser</header>
            {stockHistory === null ? (
                <div className="MainBody">
                    <p className="InfoText">
                        Upload history of a stock as csv and analyse it with 3
                        different methods.
                    </p>
                    <input
                        type="file"
                        id="file"
                        accept=".csv"
                        onChange={onFileUpload}
                        multiple={false}
                        className="FileInput"
                    />
                    <label htmlFor="file">Choose a file</label>
                </div>
            ) : (
                <div className="MainBody">
                    <p>File: {fileName}</p>
                    <button onClick={() => setStockHistory(null)}>
                        Select another file
                    </button>
                    <Analyser stockHistory={stockHistory} />
                </div>
            )}
            <footer className="Footer">
                <a href="https://github.com/FrankHerrala/stock-analyzer">
                    Github
                </a>
            </footer>
        </div>
    );
}

export default App;
