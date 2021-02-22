import React, {useState} from "react";
import DatePicker from "./DatePicker.js";
import LongestUpwardTrend from "./LongestUpwardTrend.js";
import Volumes from "./Volumes.js";
import MovingAverage from "./MovingAverage.js";

function Analyser(props){
    const dateRange = {
        "startDate": props.stockHistory[0].date, 
        "endDate": props.stockHistory[props.stockHistory.length-1].date
    };

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [analysisView, setAnalysisView] = useState(null);

    return(
        
        <div className="MainContent">
            <div className="DateSelectionGrid">
                <div className="DateSelector">
                    <p className="InfoText">Starting date:</p>
                    <DatePicker 
                        onSelect={(value) => setSelectedStartDate(value)}
                        minDate={dateRange.startDate} 
                        maxDate={
                            selectedEndDate === null
                                ?props.stockHistory[props.stockHistory.length-1].date
                                :selectedEndDate
                        }
                        stockHistory={props.stockHistory}/>
                </div>
                <div className="DateSelector">
                    <p className="InfoText">Ending date:</p>
                    <DatePicker 
                        onSelect={(value) => setSelectedEndDate(value)}
                        minDate={
                            selectedStartDate === null
                                ?props.stockHistory[0].date
                                :selectedStartDate
                        } 
                        maxDate={dateRange.endDate}
                        stockHistory={props.stockHistory}/>
                </div>
            </div>
            {selectedStartDate === null || selectedEndDate === null
                ?<div className="DisabledButtons">
                    <p className="InfoText">Select starting date and ending date.</p>
                    <div className="Buttons">
                        <button>Get volumes</button>
                        <button>Get upward trend</button>
                        <button>Get moving averages</button>
                    </div>
                </div>
                :<div className="Buttons">
                    <button onClick={() => setAnalysisView(
                    <Volumes stockHistory={props.stockHistory}
                        startDate={selectedStartDate}
                        endDate={selectedEndDate}/>)}>
                            Get volumes
                    </button>
                    <button onClick={() => setAnalysisView(<LongestUpwardTrend stockHistory={props.stockHistory}
                        startDate={selectedStartDate}
                        endDate={selectedEndDate}
                        />)}>
                            Get upward trend
                    </button>
                    <button onClick={() => setAnalysisView(<MovingAverage 
                        stockHistory={props.stockHistory}
                        startDate={selectedStartDate}
                        endDate={selectedEndDate}
                        />)}>
                            Get moving average
                    </button>
                </div>
            }
            {analysisView !== null && !(selectedStartDate === null || selectedEndDate === null)
                ? analysisView
                : null
            }
        </div>
    )
}

export default Analyser;