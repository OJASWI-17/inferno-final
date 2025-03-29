
import { createChart, ColorType } from 'lightweight-charts';
import React, { use, useEffect, useRef } from 'react';

const CandleChart = () => {
    const chartContainerRef = useRef();

    useEffect(() => {
        const initialData = [
            { time: '2018-12-22', value: 32.51 },
            { time: '2018-12-23', value: 31.11 },
            { time: '2018-12-24', value: 27.02 },
            { time: '2018-12-25', value: 27.32 },
            { time: '2018-12-26', value: 25.17 },
            { time: '2018-12-27', value: 28.89 },
            { time: '2018-12-28', value: 25.46 },
            { time: '2018-12-29', value: 23.92 },
            { time: '2018-12-30', value: 22.68 },
            { time: '2018-12-31', value: 22.67 },

        ];


        const chart = createChart(chartContainerRef.current, {
            layout: {
                backgroundColor:{type: ColorType.Solid, color:"white"}
            },
            width: chartContainerRef.current.clientWidth,
            height:500,
        });



        const newSeries =  chart.addSeries(CandlestickSeries, { upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });


        newSeries.setData(initialData);

        return () => [chart.remove()];

    });

    return <div ref={chartContainerRef} className="chartContainer" />;



}
 
export default CandleChart;
