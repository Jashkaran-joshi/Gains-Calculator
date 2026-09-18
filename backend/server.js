const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  ...(process.env.ALLOWED_ORIGINS?.split(',') ?? []),
];

app.use(cors({
  origin(origin, cb) {
    if (!origin || allowedOrigins.includes(origin) || /\.(vercel\.app|onrender\.com)$/.test(origin))
      return cb(null, true);
    cb(new Error(`CORS: ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json());

let lots = [];

app.get('/api/buys', (req, res) => {
  res.json(lots);
});

app.post('/api/buys', (req, res) => {
  const { buyDate, units, pricePerUnit } = req.body;

  if (!buyDate || !units || !pricePerUnit)
    return res.status(400).json({ error: 'Missing required fields' });

  if (units <= 0 || pricePerUnit <= 0)
    return res.status(400).json({ error: 'Units and price must be greater than 0' });

  const entry = {
    id: uuidv4(),
    buyDate,
    units: Number(units),
    pricePerUnit: Number(pricePerUnit),
  };

  lots.push(entry);
  res.status(201).json(entry);
});

app.delete('/api/buys/:id', (req, res) => {
  const before = lots.length;
  lots = lots.filter(t => t.id !== req.params.id);

  if (lots.length === before)
    return res.status(404).json({ error: 'Transaction not found' });

  res.json({ message: 'Transaction deleted' });
});

app.post('/api/calculate', (req, res) => {
  const { sellDate, units, sellPrice } = req.body;

  if (!sellDate || !units || !sellPrice)
    return res.status(400).json({ error: 'Missing required fields' });

  const qty = Number(units);
  const price = Number(sellPrice);

  if (qty <= 0 || price <= 0)
    return res.status(400).json({ error: 'Units and price must be greater than 0' });

  const available = lots.reduce((s, t) => s + t.units, 0);
  if (qty > available)
    return res.status(400).json({ error: 'Not enough units available to complete this sale.' });

  // FIFO: oldest lots first
  lots.sort((a, b) => new Date(a.buyDate) - new Date(b.buyDate));

  let remaining = qty;
  const breakdown = [];
  let costBasis = 0, saleValue = 0, gainLoss = 0;
  const sold = new Date(sellDate);

  for (const lot of lots) {
    if (remaining <= 0) break;
    if (lot.units === 0) continue;

    const consumed = Math.min(lot.units, remaining);
    const lotCost = consumed * lot.pricePerUnit;
    const lotSale = consumed * price;
    const holdingDays = Math.floor((sold - new Date(lot.buyDate)) / 86400000);

    breakdown.push({
      buyDate: lot.buyDate,
      unitsSold: consumed,
      buyPrice: lot.pricePerUnit,
      sellPrice: price,
      cost: lotCost,
      saleValue: lotSale,
      gainLoss: lotSale - lotCost,
      holdingDays,
      type: holdingDays <= 365 ? 'Short-Term' : 'Long-Term',
    });

    costBasis += lotCost;
    saleValue += lotSale;
    gainLoss += lotSale - lotCost;

    lot.units -= consumed;
    remaining -= consumed;
  }

  lots = lots.filter(t => t.units > 0);

  res.json({
    sellDate,
    sellUnits: qty,
    sellPrice: price,
    results: breakdown,
    summary: {
      totalUnitsSold: qty,
      totalCost: costBasis,
      totalSaleValue: saleValue,
      totalGainLoss: gainLoss,
    },
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
