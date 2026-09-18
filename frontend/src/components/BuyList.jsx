import { Trash2 } from 'lucide-react';

function BuyList({ buys, onDelete }) {
  if (!buys?.length) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Portfolio</h2>
        <p className="text-gray-500 text-sm">No active buy transactions.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Portfolio</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Date', 'Units', 'Price/Unit', 'Total Cost', 'Action'].map((h, i) => (
              <th
                key={h}
                className={`px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${i === 4 ? 'text-right' : 'text-left'}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {buys.map(tx => (
            <tr key={tx.id}>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{tx.buyDate}</td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{tx.units}</td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">₹{tx.pricePerUnit}</td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">₹{(tx.units * tx.pricePerUnit).toFixed(2)}</td>
              <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onDelete(tx.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BuyList;
