import { useState, useEffect } from 'react';
import { getBuys, addBuy, deleteBuy, calculateSell } from './api';
import BuyForm from './components/BuyForm';
import BuyList from './components/BuyList';
import SellForm from './components/SellForm';
import Results from './components/Results';

function App() {
  const [buys, setBuys] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchBuys() {
    try {
      setBuys(await getBuys());
    } catch {
      setError('Could not load transactions.');
    }
  }

  useEffect(() => { fetchBuys(); }, []);

  async function handleAddBuy(data) {
    setError('');
    try {
      await addBuy(data);
      fetchBuys();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add transaction.');
    }
  }

  async function handleDeleteBuy(id) {
    try {
      await deleteBuy(id);
      fetchBuys();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete transaction.');
    }
  }

  async function handleSell(data) {
    setError('');
    setLoading(true);
    try {
      setResults(await calculateSell(data));
      fetchBuys();
    } catch (err) {
      setError(err.response?.data?.error || 'Calculation failed.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">FIFO Capital Gains Calculator</h1>
          <p className="mt-2 text-sm text-gray-600">Indian Mutual Funds Edition</p>
        </header>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <BuyForm onAddBuy={handleAddBuy} />
            <BuyList buys={buys} onDelete={handleDeleteBuy} />
          </div>
          <SellForm onSell={handleSell} loading={loading} />
        </div>

        {results && (
          <div className="mt-8">
            <Results results={results} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
