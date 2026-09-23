const http = require('node:http');

const PORT = Number(process.env.PORT || 3000);

const quotes = [
  {
    id: 1,
    quote: 'The secret of getting ahead is getting started.',
    author: 'Mark Twain',
  },
  {
    id: 2,
    quote: 'It always seems impossible until it is done.',
    author: 'Nelson Mandela',
  },
  {
    id: 3,
    quote: 'Great things are done by a series of small things brought together.',
    author: 'Vincent van Gogh',
  },
  {
    id: 4,
    quote: 'What you do today can improve all your tomorrows.',
    author: 'Ralph Marston',
  },
  {
    id: 5,
    quote: 'Believe you can and you are halfway there.',
    author: 'Theodore Roosevelt',
  },
  {
    id: 6,
    quote: 'Act as if what you do makes a difference. It does.',
    author: 'William James',
  },
];

let previousQuoteId = null;

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  response.end(JSON.stringify(data, null, 2));
}

const server = http.createServer((request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    response.end();
    return;
  }

  const url = new URL(request.url, 'http://localhost');

  if (request.method === 'GET' && url.pathname === '/health') {
    sendJson(response, 200, {
      status: 'ok',
      service: 'quotes-api',
    });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/quotes') {
    sendJson(response, 200, {
      count: quotes.length,
      quotes,
    });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/quotes/random') {
    const availableQuotes = quotes.filter(
      (quote) => quote.id !== previousQuoteId,
    );
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const quote = availableQuotes[randomIndex];
    previousQuoteId = quote.id;

    sendJson(response, 200, quote);
    return;
  }

  sendJson(response, 404, {
    error: 'Route not found',
    availableRoutes: [
      'GET /health',
      'GET /api/quotes',
      'GET /api/quotes/random',
    ],
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Quotes API is running on http://localhost:' + PORT);
  console.log('Random quote: http://localhost:' + PORT + '/api/quotes/random');
  console.log('All quotes:   http://localhost:' + PORT + '/api/quotes');
  console.log('Health check: http://localhost:' + PORT + '/health');
});