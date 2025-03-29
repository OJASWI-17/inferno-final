import { useState } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  Minus, 
  CandlestickChart, 
  Clock,
  Info,
  BarChart,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StarBackground from '../components/StarBackground';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";
import { ChartContainer } from "../components/ui/chart";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  BarChart as RechartsBarChart,
  Bar,
  Legend
} from 'recharts';
import BG from '../assets/BgInferno.svg';

const StockChart = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState('market'); // market, limit
  const [price, setPrice] = useState('');
  const [timeInForce, setTimeInForce] = useState('day'); // day, gtc, ioc
  
  // Mock data for demonstration
  const stockData = {
    
    name: "Bitcoin",
    symbol: "BTC",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    currentPrice: 26735.59,
    change24h: -5.12,
    change24hUp: false,
    change7d: 1.12,
    change7dUp: true,
    marketCap: "23,621,421,545",
    volume: "2,487,902,497",
    high24h: 27890.45,
    low24h: 26100.30,
    allTimeHigh: 69000,
    supply: "19,428,550",
    maxSupply: "21,000,000",
  };

  // Candlestick chart data
  const candlestickData = [
    { date: '2023-01-01', open: 26100, close: 26300, high: 26500, low: 25900, volume: 25000 },
    { date: '2023-01-02', open: 26300, close: 26700, high: 26800, low: 26200, volume: 28000 },
    { date: '2023-01-03', open: 26700, close: 26500, high: 27000, low: 26400, volume: 30000 },
    { date: '2023-01-04', open: 26500, close: 27100, high: 27200, low: 26400, volume: 32000 },
    { date: '2023-01-05', open: 27100, close: 26900, high: 27300, low: 26800, volume: 27000 },
    { date: '2023-01-06', open: 26900, close: 27500, high: 27600, low: 26800, volume: 29000 },
    { date: '2023-01-07', open: 27500, close: 27300, high: 27700, low: 27100, volume: 31000 },
    { date: '2023-01-08', open: 27300, close: 27800, high: 28000, low: 27200, volume: 33000 },
    { date: '2023-01-09', open: 27800, close: 27600, high: 28100, low: 27500, volume: 30000 },
    { date: '2023-01-10', open: 27600, close: 27900, high: 28000, low: 27500, volume: 32000 },
    { date: '2023-01-11', open: 27900, close: 28200, high: 28300, low: 27800, volume: 35000 },
    { date: '2023-01-12', open: 28200, close: 27900, high: 28400, low: 27800, volume: 33000 },
    { date: '2023-01-13', open: 27900, close: 28100, high: 28200, low: 27700, volume: 31000 },
    { date: '2023-01-14', open: 28100, close: 28400, high: 28500, low: 28000, volume: 34000 },
    { date: '2023-01-15', open: 28400, close: 28000, high: 28600, low: 27900, volume: 32000 },
    { date: '2023-01-16', open: 28000, close: 27600, high: 28100, low: 27500, volume: 30000 },
    { date: '2023-01-17', open: 27600, close: 27800, high: 27900, low: 27500, volume: 29000 },
    { date: '2023-01-18', open: 27800, close: 27200, high: 27900, low: 27100, volume: 31000 },
    { date: '2023-01-19', open: 27200, close: 26800, high: 27300, low: 26700, volume: 30000 },
    { date: '2023-01-20', open: 26800, close: 26500, high: 26900, low: 26400, volume: 28000 },
  ];
  
  // Price history chart data
  const priceHistoryData = candlestickData.map(item => ({
    date: item.date,
    price: item.close
  }));
  
  // Volume chart data
  const volumeData = candlestickData.map(item => ({
    date: item.date,
    volume: item.volume
  }));

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity('');
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleBuy = () => {
    toast.success(`Bought ${quantity} ${stockData.symbol} at $${stockData.currentPrice}`);
  };

  const handleSell = () => {
    toast.success(`Sold ${quantity} ${stockData.symbol} at $${stockData.currentPrice}`);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background"
    style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <StarBackground />
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        {/* Header with Stock Info */}
        <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-700 mb-6">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-white/10 p-1 flex items-center justify-center">
                <img 
                  src={stockData.logo} 
                  alt={stockData.name} 
                  className="h-10 w-10 rounded-full" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/40x40/gray/white?text=' + stockData.symbol.charAt(0);
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{stockData.name} ({stockData.symbol})</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-semibold text-white">${stockData.currentPrice.toLocaleString()}</span>
                  <span className={`flex items-center ${stockData.change24hUp ? 'text-green-500' : 'text-red-500'}`}>
                    {stockData.change24hUp ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    {Math.abs(stockData.change24h)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Button onClick={() => navigate('/trading')} variant="outline" className="border-gray-700">
                Back to Trading
              </Button>
              <Button variant="outline" className="border-gray-700">
                <Info className="h-4 w-4 mr-2" /> About
              </Button>
            </div>
          </div>
          
          {/* Stock stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-secondary/30 p-3 rounded-lg">
              <div className="text-gray-400 text-xs">Market Cap</div>
              <div className="text-white font-medium">${stockData.marketCap}</div>
            </div>
            <div className="bg-secondary/30 p-3 rounded-lg">
              <div className="text-gray-400 text-xs">24h Volume</div>
              <div className="text-white font-medium">${stockData.volume}</div>
            </div>
            <div className="bg-secondary/30 p-3 rounded-lg">
              <div className="text-gray-400 text-xs">24h High</div>
              <div className="text-white font-medium">${stockData.high24h.toLocaleString()}</div>
            </div>
            <div className="bg-secondary/30 p-3 rounded-lg">
              <div className="text-gray-400 text-xs">24h Low</div>
              <div className="text-white font-medium">${stockData.low24h.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        {/* Main content split into chart and buy/sell areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-800">
              <Tabs defaultValue="candlestick" className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList className="bg-secondary/30">
                    <TabsTrigger value="candlestick" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      <CandlestickChart className="h-4 w-4 mr-2" /> Candlestick
                    </TabsTrigger>
                    <TabsTrigger value="line" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      <TrendingUp className="h-4 w-4 mr-2" /> Line
                    </TabsTrigger>
                    <TabsTrigger value="volume" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      <BarChart className="h-4 w-4 mr-2" /> Volume
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-700 text-xs">1H</Button>
                    <Button variant="outline" size="sm" className="border-gray-700 text-xs">1D</Button>
                    <Button variant="outline" size="sm" className="border-gray-700 bg-primary/20 text-xs">1W</Button>
                    <Button variant="outline" size="sm" className="border-gray-700 text-xs">1M</Button>
                    <Button variant="outline" size="sm" className="border-gray-700 text-xs">1Y</Button>
                  </div>
                </div>
                
                <TabsContent value="candlestick" className="mt-0">
                  <div className="h-[400px] w-full">
                    <ChartContainer config={{
                      "up": { color: "#22c55e" },
                      "down": { color: "#ef4444" },
                      "primary": { color: "#3b82f6" }
                    }}>
                      <RechartsBarChart
                        data={candlestickData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#718096"
                          tick={{ fontSize: 12 }}
                          tickFormatter={(tick) => tick.split('-')[2]}
                        />
                        <YAxis 
                          stroke="#718096"
                          domain={['dataMin', 'dataMax']}
                          tick={{ fontSize: 12 }}
                          tickFormatter={(tick) => `$${tick}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1A1F2C',
                            border: '1px solid #2d3748',
                            borderRadius: '0.375rem',
                            color: '#E2E8F0'
                          }}
                          formatter={(value) => [`$${value}`, '']}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Legend />
                        <Bar
                          dataKey="volume"
                          fill="#3b82f6"
                          opacity={0.3}
                          name="Volume"
                        />
                        <Bar
                          dataKey="high"
                          fill="#22c55e"
                          name="High"
                        />
                        <Bar
                          dataKey="low"
                          fill="#ef4444"
                          name="Low"
                        />
                      </RechartsBarChart>
                    </ChartContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="line" className="mt-0">
                  <div className="h-[400px] w-full">
                    <ChartContainer config={{
                      "primary": { color: "#3b82f6" }
                    }}>
                      <AreaChart
                        data={priceHistoryData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#718096"
                          tick={{ fontSize: 12 }}
                          tickFormatter={(tick) => tick.split('-')[2]}
                        />
                        <YAxis 
                          stroke="#718096"
                          domain={['dataMin', 'dataMax']}
                          tick={{ fontSize: 12 }}
                          tickFormatter={(tick) => `$${tick}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1A1F2C',
                            border: '1px solid #2d3748',
                            borderRadius: '0.375rem',
                            color: '#E2E8F0'
                          }}
                          formatter={(value) => [`$${value}`, 'Price']}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#3b82f6" 
                          fill="#3b82f6" 
                          fillOpacity={0.2} 
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="volume" className="mt-0">
                  <div className="h-[400px] w-full">
                    <ChartContainer config={{
                      "primary": { color: "#3b82f6" }
                    }}>
                      <AreaChart
                        data={volumeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#718096"
                          tick={{ fontSize: 12 }}
                          tickFormatter={(tick) => tick.split('-')[2]}
                        />
                        <YAxis 
                          stroke="#718096"
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1A1F2C',
                            border: '1px solid #2d3748',
                            borderRadius: '0.375rem',
                            color: '#E2E8F0'
                          }}
                          formatter={(value) => [value, 'Volume']}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="volume" 
                          stroke="#3b82f6" 
                          fill="#3b82f6" 
                          fillOpacity={0.2} 
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Buy/Sell Section */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-800">
              <Tabs defaultValue="buy" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="buy" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Buy</TabsTrigger>
                  <TabsTrigger value="sell" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Sell</TabsTrigger>
                </TabsList>
                
                <TabsContent value="buy" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-gray-400 text-sm">Order Type</label>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant={orderType === 'market' ? 'default' : 'outline'} 
                          className={orderType !== 'market' ? 'border-gray-700' : ''} 
                          onClick={() => setOrderType('market')}
                        >
                          Market
                        </Button>
                        <Button 
                          variant={orderType === 'limit' ? 'default' : 'outline'} 
                          className={orderType !== 'limit' ? 'border-gray-700' : ''}
                          onClick={() => setOrderType('limit')}
                        >
                          Limit
                        </Button>
                      </div>
                    </div>
                    
                    {orderType === 'limit' && (
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">Limit Price</label>
                        <Input 
                          type="number" 
                          placeholder="Enter price" 
                          value={price} 
                          onChange={(e) => setPrice(e.target.value)}
                          className="bg-secondary/30 border-gray-700"
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="text-gray-400 text-sm block mb-2">Quantity</label>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 border-gray-700"
                          onClick={decrementQuantity}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input 
                          type="number" 
                          value={quantity} 
                          onChange={handleQuantityChange}
                          className="text-center bg-secondary/30 border-gray-700"
                        />
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 border-gray-700"
                          onClick={incrementQuantity}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {orderType === 'limit' && (
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">Time In Force</label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button 
                            variant={timeInForce === 'day' ? 'default' : 'outline'} 
                            className={timeInForce !== 'day' ? 'border-gray-700 text-sm' : 'text-sm'} 
                            onClick={() => setTimeInForce('day')}
                          >
                            Day
                          </Button>
                          <Button 
                            variant={timeInForce === 'gtc' ? 'default' : 'outline'} 
                            className={timeInForce !== 'gtc' ? 'border-gray-700 text-sm' : 'text-sm'}
                            onClick={() => setTimeInForce('gtc')}
                          >
                            GTC
                          </Button>
                          <Button 
                            variant={timeInForce === 'ioc' ? 'default' : 'outline'} 
                            className={timeInForce !== 'ioc' ? 'border-gray-700 text-sm' : 'text-sm'}
                            onClick={() => setTimeInForce('ioc')}
                          >
                            IOC
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Estimated Cost</span>
                        <span className="text-white">${(stockData.currentPrice * quantity).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Transaction Fee (0.1%)</span>
                        <span className="text-white">${((stockData.currentPrice * quantity) * 0.001).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-6 pt-2 border-t border-gray-700">
                        <span className="font-medium text-white">Total</span>
                        <span className="font-medium text-white">${((stockData.currentPrice * quantity) * 1.001).toLocaleString()}</span>
                      </div>
                      
                      <Button className="w-full bg-green-500 hover:bg-green-600" onClick={handleBuy}>
                        Buy {stockData.symbol}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="sell" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-gray-400 text-sm">Order Type</label>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant={orderType === 'market' ? 'default' : 'outline'} 
                          className={orderType !== 'market' ? 'border-gray-700' : ''} 
                          onClick={() => setOrderType('market')}
                        >
                          Market
                        </Button>
                        <Button 
                          variant={orderType === 'limit' ? 'default' : 'outline'} 
                          className={orderType !== 'limit' ? 'border-gray-700' : ''}
                          onClick={() => setOrderType('limit')}
                        >
                          Limit
                        </Button>
                      </div>
                    </div>
                    
                    {orderType === 'limit' && (
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">Limit Price</label>
                        <Input 
                          type="number" 
                          placeholder="Enter price" 
                          value={price} 
                          onChange={(e) => setPrice(e.target.value)}
                          className="bg-secondary/30 border-gray-700"
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="text-gray-400 text-sm block mb-2">Quantity</label>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 border-gray-700"
                          onClick={decrementQuantity}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input 
                          type="number" 
                          value={quantity} 
                          onChange={handleQuantityChange}
                          className="text-center bg-secondary/30 border-gray-700"
                        />
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 border-gray-700"
                          onClick={incrementQuantity}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {orderType === 'limit' && (
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">Time In Force</label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button 
                            variant={timeInForce === 'day' ? 'default' : 'outline'} 
                            className={timeInForce !== 'day' ? 'border-gray-700 text-sm' : 'text-sm'} 
                            onClick={() => setTimeInForce('day')}
                          >
                            Day
                          </Button>
                          <Button 
                            variant={timeInForce === 'gtc' ? 'default' : 'outline'} 
                            className={timeInForce !== 'gtc' ? 'border-gray-700 text-sm' : 'text-sm'}
                            onClick={() => setTimeInForce('gtc')}
                          >
                            GTC
                          </Button>
                          <Button 
                            variant={timeInForce === 'ioc' ? 'default' : 'outline'} 
                            className={timeInForce !== 'ioc' ? 'border-gray-700 text-sm' : 'text-sm'}
                            onClick={() => setTimeInForce('ioc')}
                          >
                            IOC
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Estimated Value</span>
                        <span className="text-white">${(stockData.currentPrice * quantity).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Transaction Fee (0.1%)</span>
                        <span className="text-white">${((stockData.currentPrice * quantity) * 0.001).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-6 pt-2 border-t border-gray-700">
                        <span className="font-medium text-white">Total</span>
                        <span className="font-medium text-white">${((stockData.currentPrice * quantity) * 0.999).toLocaleString()}</span>
                      </div>
                      
                      <Button className="w-full bg-red-500 hover:bg-red-600" onClick={handleSell}>
                        Sell {stockData.symbol}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Stock Details */}
            <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-800 mt-6">
              <h3 className="text-lg font-medium text-white mb-4">Asset Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">All Time High</span>
                  <span className="text-white">${stockData.allTimeHigh.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Circulating Supply</span>
                  <span className="text-white">{stockData.supply} {stockData.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Supply</span>
                  <span className="text-white">{stockData.maxSupply} {stockData.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Supply Used</span>
                  <span className="text-white">{((parseFloat(stockData.supply.replace(/,/g, '')) / parseFloat(stockData.maxSupply.replace(/,/g, ''))) * 100).toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;