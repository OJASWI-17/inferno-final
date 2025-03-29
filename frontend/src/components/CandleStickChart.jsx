import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

export default function CandleStickChart({ data }) {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);
  const candleSeriesRef = useRef(null);
  const [hoverData, setHoverData] = useState(null);

  // Process data for candlestick chart
  const processedData = data.map(item => ({
    time: item.date, // Convert date to time
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close
  }));

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Initialize chart with proper dimensions
    chartInstance.current = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1a1a1a' },
        textColor: '#ffffff'
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      timeScale: {
        timeVisible: true,
        borderColor: '#333333',
      },
      rightPriceScale: {
        borderColor: '#333333',
      },
      grid: {
        vertLines: { color: '#333333' },
        horzLines: { color: '#333333' },
      }
    });

    // Add candlestick series with proper styling
    candleSeriesRef.current = chartInstance.current.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      borderVisible: false,
      priceLineVisible: false
    });

    // Set candlestick data
    candleSeriesRef.current.setData(processedData);

    // Handle crosshair
    chartInstance.current.subscribeCrosshairMove(param => {
      if (param.time) {
        const priceData = param.seriesPrices.get(candleSeriesRef.current);
        setHoverData({
          date: param.time,
          open: priceData?.open,
          high: priceData?.high,
          low: priceData?.low,
          close: priceData?.close
        });
      }
    });

    // Handle resize
    const resizeObserver = new ResizeObserver(entries => {
      chartInstance.current.applyOptions({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height
      });
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.current.remove();
    };
  }, []);

  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg">
      {hoverData && (
        <div className="bg-black/80 text-white p-3 rounded-lg mb-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Date:</span> <span>{hoverData.date}</span>
            <span>Open:</span> <span>₹{hoverData.open?.toLocaleString()}</span>
            <span>High:</span> <span>₹{hoverData.high?.toLocaleString()}</span>
            <span>Low:</span> <span>₹{hoverData.low?.toLocaleString()}</span>
            <span>Close:</span> <span>₹{hoverData.close?.toLocaleString()}</span>
          </div>
        </div>
      )}
      <div 
        ref={chartContainerRef}
        className="w-full h-[500px]"
      />
    </div>
  );
}