function CsvParser(file, saveResult){
    const reader = new FileReader();
    let tempArr = [];  
    reader.onload = (evt) => {
      let csvStringLines =  evt.target.result.split(/\n/);
      csvStringLines.pop();
      csvStringLines.shift();
      csvStringLines.map( line => {
        const lineProperties = line.split(",")
        tempArr.unshift({
          "date": new Date(lineProperties[0]),
          "close": parseFloat(lineProperties[1].slice(2)),
          "volume": parseInt(lineProperties[2]),
          "open": parseFloat(lineProperties[3].slice(2)),
          "high": parseFloat(lineProperties[4].slice(2)),
          "low": parseFloat(lineProperties[5].slice(2))
        })
      })
      console.log(tempArr)
      saveResult(tempArr);
    }
    reader.readAsText(file);

}

export default CsvParser;