import * as Epex from 'https://esm.sh/@tvanlaerhoven/epex-client';

export default async function handler(request) {
  try {
    const client = new Epex.Client();
    const data = await client.getDayAheadMarketData(
      Epex.MarketArea.Belgium,
      Epex.today()
    );

    const result = data.entries.map(e => ({
      hour: `${e.hour}:00`,
      price: (e.price * 100).toFixed(2)
    }));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
