import { useState } from 'react';

function SellForm({ onSell, loading }) {
  const [sellDate, setSellDate] = useState('');
  const [units, setUnits] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!sellDate || !units || !sellPrice) return;
    onSell({ sellDate, units, sellPrice });
    setSellDate('');
    setUnits('');
    setSellPrice('');
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Sell Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Sell Date</label>
          <input
            type="date"
            required
            value={sellDate}
            onChange={e => setSellDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Units to Sell</label>
            <input
              type="number"
              step="0.001"
              min="0.001"
              required
              value={units}
              onChange={e => setUnits(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sell Price Per Unit (₹)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={sellPrice}
              onChange={e => setSellPrice(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
            loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Calculating...' : 'Calculate Gain/Loss'}
        </button>
      </form>
    </div>
  );
}

export default SellForm;
