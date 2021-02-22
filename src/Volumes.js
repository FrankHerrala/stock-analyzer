import React from "react";
import './App.css';

function Volumes(props){
    const volumesPriceChanges = getVolumesPriceChanges();

    function getVolumesPriceChanges(){
        const selectedStockHistory = props.stockHistory.slice(
            props.stockHistory.findIndex( elem => elem.date.toString() === props.startDate.toString() ), 
            props.stockHistory.findIndex( elem => elem.date.toString() === props.endDate.toString() )+1)
        let volumes = selectedStockHistory.map(elem => {
            return {"date": elem.date, "volume": elem.volume, "priceChange": elem.high - elem.low}
        })
        return volumes.sort(compare);
    }

    return(
        <div className="AnalysisContainer">
            <p>List of dates ordered by trading volume and price change.</p>
            <table id="VolumesTable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Volume</th>
                        <th>Price change</th>
                    </tr>
                </thead>
                <tbody>
                    {volumesPriceChanges.map(elem => 
                        <tr key={elem.date.getTime()}>
                            <td>{elem.date.getDate()}.{elem.date.getMonth()+1}.{elem.date.getFullYear()}</td>
                            <td>{elem.volume}</td>
                            <td>{Number.parseFloat(elem.priceChange).toFixed(2)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Volumes;

function compare(a, b){
    if(a.volume < b.volume){
        return 1;
    }else if(a.volume > b.volume){
        return -1;
    }else if(a.volume === b.volume && a.priceChange < b.priceChange){
        return 1;
    }else if(a.volume === b.volume && a.priceChange > b.priceChange){
        return -1;
    }else{
        return 0;
    }
}