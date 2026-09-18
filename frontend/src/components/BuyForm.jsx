import { useState } from 'react';

function BuyForm({ onAddBuy }) {
  const [buyDate, setBuyDate] = useState('');
  const [units, setUnits] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!buyDate || !units || !pricePerUnit) return;
    onAddBuy({ buyDate, units, pricePerUnit });
    setBuyDate('');
    setUnits('');
    setPricePerUnit('');
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Buy Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Buy Date</label>
          <input
            type="date"
            required
            value={buyDate}
            onChange={e => setBuyDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Units</label>
            <input
              type="number"
              step="0.001"
              min="0.001"
              required
              value={units}
              onChange={e => setUnits(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price Per Unit (₹)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={pricePerUnit}
              onChange={e => setPricePerUnit(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Buy
        </button>
      </form>
    </div>
  );
}

export default BuyForm;
