import React from "react";

function LongestUpwardTrend(props) {
    const longestUpwardTrend = GetUpwardTrend();

    function GetUpwardTrend() {
        const selectedStockHistory = props.stockHistory.slice(
            props.stockHistory.findIndex(
                (elem) => elem.date.toString() === props.startDate.toString()
            ),
            props.stockHistory.findIndex(
                (elem) => elem.date.toString() === props.endDate.toString()
            ) + 1
        );

        let trendStart = selectedStockHistory[0].date;
        let trendEnd = {};
        let trendLength = 1;
        let previousClosingPrice = selectedStockHistory[0].close;
        let longestUpwardTrendLength = 1;
        let longestUpwardTrends = [];

        selectedStockHistory.forEach((element) => {
            if (element.close > previousClosingPrice) {
                trendLength += 1;
                trendEnd = element.date;
            } else {
                trendLength = 1;
                trendStart = element.date;
            }

            if (trendLength > longestUpwardTrendLength) {
                longestUpwardTrends = [{ start: trendStart, end: trendEnd }];
                longestUpwardTrendLength = trendLength;
            } else if (trendLength === longestUpwardTrendLength) {
                longestUpwardTrends.push({ start: trendStart, end: trendEnd });
            }

            previousClosingPrice = element.close;
        });

        return { dates: longestUpwardTrends, length: longestUpwardTrendLength };
    }

    return (
        <div className="AnalysisContainer">
            <p>
                Amount of days closing price was higher than closing price the
                day before.
            </p>
            <p>Longest upward trend was {longestUpwardTrend.length} days.</p>
            {longestUpwardTrend.dates.map((elem) => (
                <p key={elem.start.getTime()}>
                    From {elem.start.toDateString()} to{" "}
                    {elem.end.toDateString()}
                </p>
            ))}
        </div>
    );
}

export default LongestUpwardTrend;
