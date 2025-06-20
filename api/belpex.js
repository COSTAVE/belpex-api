import * as Epex from '@tvanlaerhoven/epex-client';

export default async function handler(req, res) {
  const client = new Epex.Client();
  const data = await client.getDayAheadMarketData(
    Epex.MarketArea.Belgium,
    Epex.today()
  );
  const result = data.entries.map(e => ({
    hour: `${e.hour}:00`,
    price: (e.price * 100).toFixed(2)
  }));
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(result);
}
