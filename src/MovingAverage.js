import React, {useState} from "react";
import './App.css';

function MovingAverage(props){
    const priceChangesToSMAFive = getMovingAverages();

    function getMovingAverages(){
        let movingAverages = [];
        let lastFiveClosePrices = [];
        let startIndex = 0;
        let noDataDays = 0;

        if(props.stockHistory.findIndex( elem => elem.date.toString() === props.startDate.toString() ) < 5){
            startIndex = 0;
            noDataDays = Math.abs(props.stockHistory.findIndex( elem => elem.date.toString() === props.startDate.toString() )-5);
        }else{
            startIndex = props.stockHistory.findIndex( 
                elem => elem.date.toString() === props.startDate.toString() ) -5;
        }
        
        for( let i = startIndex; 
            i < props.stockHistory.findIndex( elem => elem.date.toString() === props.endDate.toString())+1; 
            i++){
            
            if(lastFiveClosePrices.length === 5){
                
                movingAverages.push({
                    "date": props.stockHistory[i].date,
                    "priceChange": props.stockHistory[i].open/(lastFiveClosePrices.reduce(sum, 0)/5),
                })
                lastFiveClosePrices.shift()
            }
            lastFiveClosePrices.push(props.stockHistory[i].open);
        }
        return {"movingAverages": movingAverages.sort(compare), "noDataDays": noDataDays};
    }

    return(
        <div className="AnalysisContainer">
            <p>Opening price compared to 5 day moving average.</p>
            {priceChangesToSMAFive.noDataDays === 0
                ? null
                :<p>Not enough data to create SMA5 fot the first {priceChangesToSMAFive.noDataDays} days</p>
            }
            <table id="MovingAverageTable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Opening price/SMA5</th>
                    </tr>
                </thead>
                <tbody>
                    {priceChangesToSMAFive.movingAverages.map( elem => 
                            <tr key={elem.date.getTime()}>
                                <td>{elem.date.getDate()}.{elem.date.getMonth()+1}.{elem.date.getFullYear()}</td>
                                <td>{Number.parseFloat((elem.priceChange-1)*100).toFixed(2)}%</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default MovingAverage;

function sum(a,b){
    return a + b;
} 

function compare(a,b){
    if( a.priceChange > b.priceChange){
        return -1;
    }else if( a.priceChange < b.priceChange){
        return 1;
    }else{
        return 0;
    }

}

