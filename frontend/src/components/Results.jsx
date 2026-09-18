function Results({ results }) {
  if (!results?.results) return null;

  const { summary, results: lots } = results;

  const stGain = lots.filter(l => l.type === 'Short-Term').reduce((s, l) => s + l.gainLoss, 0);
  const ltGain = lots.filter(l => l.type === 'Long-Term').reduce((s, l) => s + l.gainLoss, 0);

  const gainColor = (val) => val >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Calculation Results</h2>

      <div className="mb-6 overflow-x-auto">
        <h3 className="text-lg font-medium text-gray-700 mb-2">FIFO Breakdown</h3>
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              {['Buy Date', 'Units Consumed', 'Buy Price', 'Gain/Loss', 'Holding Days', 'Type'].map(h => (
                <th key={h} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lots.map((lot, i) => (
              <tr key={i}>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{lot.buyDate}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{lot.unitsSold}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">₹{lot.buyPrice}</td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm font-medium ${gainColor(lot.gainLoss)}`}>
                  ₹{lot.gainLoss.toFixed(2)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{lot.holdingDays}</td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm ${lot.type === 'Long-Term' ? 'text-purple-600' : 'text-orange-600'}`}>
                  {lot.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-gray-50 p-4 rounded border">
          <p className="text-sm text-gray-500">Total Units Sold</p>
          <p className="text-xl font-semibold">{summary.totalUnitsSold}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded border">
          <p className="text-sm text-gray-500">Total Sale Value</p>
          <p className="text-xl font-semibold">₹{summary.totalSaleValue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded border">
          <p className="text-sm text-gray-500">Total Cost</p>
          <p className="text-xl font-semibold">₹{summary.totalCost.toFixed(2)}</p>
        </div>
        <div className={`p-4 rounded border ${summary.totalGainLoss >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className={`text-sm ${summary.totalGainLoss >= 0 ? 'text-green-700' : 'text-red-700'}`}>Total Gain/Loss</p>
          <p className={`text-xl font-bold ${gainColor(summary.totalGainLoss)}`}>
            ₹{summary.totalGainLoss.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-orange-50 p-4 rounded border border-orange-100">
          <p className="text-sm text-orange-700">Short-Term Gain/Loss</p>
          <p className={`text-lg font-semibold ${gainColor(stGain)}`}>₹{stGain.toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded border border-purple-100">
          <p className="text-sm text-purple-700">Long-Term Gain/Loss</p>
          <p className={`text-lg font-semibold ${gainColor(ltGain)}`}>₹{ltGain.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Results;
