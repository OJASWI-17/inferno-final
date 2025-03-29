import { useState } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  Minus, 
  Info,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StarBackground from '../components/StarBackground';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";
import BG from '../assets/BgInferno.svg';
import CandleStickChart from "../components/CandleStickChart";
import ErrorBoundary from '../components/ErrorBoundry';

const StockChart = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState('market');
  const [price, setPrice] = useState('');
  const [timeInForce, setTimeInForce] = useState('day');

  // Chart data
  setInterval(()=>{[sampleData,...sampleData]},1000)
  const sampleData = [
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
  ];

  // Mock stock data
  const stockData = {
    name: "Bitcoin",
    symbol: "BTC",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    currentPrice: 26735.59,
    change24h: -5.12,
    change24hUp: false,
    marketCap: "23,621,421,545",
    volume: "2,487,902,497",
    high24h: 27890.45,
    low24h: 26100.30,
    allTimeHigh: 69000,
    supply: "19,428,550",
    maxSupply: "21,000,000",
  };

  // Quantity handlers
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) setQuantity(value);
    else if (e.target.value === '') setQuantity('');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  // Trade handlers
  const handleBuy = () => toast.success(`Bought ${quantity} ${stockData.symbol} at $${stockData.currentPrice}`);
  const handleSell = () => toast.success(`Sold ${quantity} ${stockData.symbol} at $${stockData.currentPrice}`);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background"
      style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      
      <StarBackground />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        {/* Stock Header Section */}
        <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-700 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-white/10 p-1 flex items-center justify-center">
                <img 
                  src={stockData.logo} 
                  alt={stockData.name} 
                  className="h-10 w-10 rounded-full"
                  onError={(e) => e.target.src = `https://placehold.co/40x40/gray/white?text=${stockData.symbol.charAt(0)}`}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{stockData.name} ({stockData.symbol})</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-semibold text-white">
                    ${stockData.currentPrice.toLocaleString()}
                  </span>
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
          
          {/* Stock Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              ['Market Cap', stockData.marketCap],
              ['24h Volume', stockData.volume],
              ['24h High', stockData.high24h.toLocaleString()],
              ['24h Low', stockData.low24h.toLocaleString()],
            ].map(([label, value]) => (
              <div key={label} className="bg-secondary/30 p-3 rounded-lg">
                <div className="text-gray-400 text-xs">{label}</div>
                <div className="text-white font-medium">${value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section - Left Column */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-700 h-[600px]">
              <ErrorBoundary>
                <CandleStickChart 
                  data={sampleData}
                  height="100%"
                  upColor="#4CAF50"
                  downColor="#FF5252"
                  showTooltip={true}
                />
              </ErrorBoundary>
            </div>
          </div>

          {/* Buy/Sell Section - Right Column */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-800">
              <Tabs defaultValue="buy">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="buy" className="data-[state=active]:bg-green-500">Buy</TabsTrigger>
                  <TabsTrigger value="sell" className="data-[state=active]:bg-red-500">Sell</TabsTrigger>
                </TabsList>

                {/* Buy Form */}
                <TabsContent value="buy" className="space-y-6">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={orderType === 'market' ? 'default' : 'outline'} 
                      onClick={() => setOrderType('market')}
                    >
                      Market
                    </Button>
                    <Button 
                      variant={orderType === 'limit' ? 'default' : 'outline'}
                      onClick={() => setOrderType('limit')}
                    >
                      Limit
                    </Button>
                  </div>

                  {orderType === 'limit' && (
                    <Input
                      type="number"
                      placeholder="Limit Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="bg-secondary/30 border-gray-700"
                    />
                  )}

                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Quantity</label>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={decrementQuantity}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="text-center bg-secondary/30 border-gray-700"
                      />
                      <Button variant="outline" size="icon" onClick={incrementQuantity}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total</span>
                      <span className="text-white">
                        ${(stockData.currentPrice * quantity).toLocaleString()}
                      </span>
                    </div>
                    <Button className="w-full bg-green-500 hover:bg-green-600" onClick={handleBuy}>
                      Buy {stockData.symbol}
                    </Button>
                  </div>
                </TabsContent>

                {/* Sell Form */}
                <TabsContent value="sell" className="space-y-6">
                  {/* Similar structure to buy form */}
                </TabsContent>
              </Tabs>
            </div>

            {/* Asset Details */}
            <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-800 mt-6">
              <h3 className="text-lg font-medium text-white mb-4">Asset Details</h3>
              <div className="space-y-3">
                {[
                  ['All Time High', `$${stockData.allTimeHigh.toLocaleString()}`],
                  ['Circulating Supply', `${stockData.supply} ${stockData.symbol}`],
                  ['Max Supply', `${stockData.maxSupply} ${stockData.symbol}`],
                  ['Supply Used', `${((parseFloat(stockData.supply.replace(/,/g, '')) / parseFloat(stockData.maxSupply.replace(/,/g, '')) * 100).toFixed(2))}%`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;