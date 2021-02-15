import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import CsvParser from "./CsvParser.js";

function App() {
  const [stockHistory, setStockHistory] = useState(null);

  useEffect( () => {
    console.log(stockHistory);
  })
  function onFileUpload(e) {
    CsvParser(e.target.files[0], setStockHistory)
  }


  return (
    <div className="App">
      <h1>
        Stock watch
      </h1>
      {stockHistory === null
        ?<div>
          <input type="file" accept=".csv" onChange={onFileUpload} multiple={false} />
        </div>
        :<div>
          <button onClick={() => setStockHistory(null)}>Select another file</button>
        </div>
      }
    </div>
  );
}

export default App;
