const crypto = require('node:crypto');
const http = require('node:http');

const PORT = Number(process.env.PORT || 3000);
const TOKEN_LIFETIME_MS = 30 * 60 * 1000;
const DEMO_EMAIL = 'student@cce106.edu.ph';
const DEMO_PASSWORD = 'CCE106pass!';

const demoStudent = {
  id: 'CCE106-2026-001',
  fullName: 'Aldrean Lloyd Supe',
  email: DEMO_EMAIL,
  program: 'Bachelor of Science in Information Technology',
  year: '3rd Year',
  role: 'Student',
};

const sessions = new Map();
const quotes = [
  { id: 1, quote: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { id: 2, quote: 'It always seems impossible until it is done.', author: 'Nelson Mandela' },
  { id: 3, quote: 'Great things are done by a series of small things brought together.', author: 'Vincent van Gogh' },
  { id: 4, quote: 'What you do today can improve all your tomorrows.', author: 'Ralph Marston' },
  { id: 5, quote: 'Believe you can and you are halfway there.', author: 'Theodore Roosevelt' },
  { id: 6, quote: 'Act as if what you do makes a difference. It does.', author: 'William James' },
];

let previousQuoteId = null;

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  response.end(JSON.stringify(data, null, 2));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;

      if (body.length > 100_000) {
        reject(new Error('Request body is too large.'));
        request.destroy();
      }
    });

    request.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Request body must be valid JSON.'));
      }
    });

    request.on('error', reject);
  });
}

function getSession(request) {
  const authorization = request.headers.authorization || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) return null;

  const session = sessions.get(token);

  if (!session) return null;

  if (Date.now() >= session.expiresAt) {
    sessions.delete(token);
    return null;
  }

  return { token, session };
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    response.end();
    return;
  }

  const url = new URL(request.url, 'http://localhost');

  if (request.method === 'GET' && url.pathname === '/') {
    sendJson(response, 200, {
      service: 'CCE106 student portal and quotes API',
      demoLogin: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
      routes: [
        'POST /api/auth/login',
        'GET /api/profile (Bearer token required)',
        'POST /api/auth/logout (Bearer token required)',
        'GET /api/quotes',
        'GET /api/quotes/random',
        'GET /health',
      ],
    });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/health') {
    sendJson(response, 200, { status: 'ok', service: 'cce106-api' });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/auth/login') {
    try {
      const body = await readJson(request);
      const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
      const password = typeof body.password === 'string' ? body.password : '';

      if (!email || !password) {
        sendJson(response, 400, { error: 'Email and password are required.' });
        return;
      }

      if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
        sendJson(response, 401, { error: 'Invalid email or password.' });
        return;
      }

      const accessToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = Date.now() + TOKEN_LIFETIME_MS;
      sessions.set(accessToken, { studentId: demoStudent.id, expiresAt });

      sendJson(response, 200, {
        accessToken,
        tokenType: 'Bearer',
        expiresIn: TOKEN_LIFETIME_MS / 1000,
        expiresAt: new Date(expiresAt).toISOString(),
        user: demoStudent,
      });
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/profile') {
    const auth = getSession(request);

    if (!auth) {
      sendJson(response, 401, {
        error: 'Missing, invalid, or expired Bearer token.',
      });
      return;
    }

    sendJson(response, 200, {
      user: demoStudent,
      session: {
        tokenType: 'Bearer',
        expiresAt: new Date(auth.session.expiresAt).toISOString(),
      },
    });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/auth/logout') {
    const auth = getSession(request);

    if (!auth) {
      sendJson(response, 401, {
        error: 'Missing, invalid, or expired Bearer token.',
      });
      return;
    }

    sessions.delete(auth.token);
    sendJson(response, 200, { message: 'Signed out successfully.' });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/quotes') {
    sendJson(response, 200, { count: quotes.length, quotes });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/quotes/random') {
    const available = quotes.filter((quote) => quote.id !== previousQuoteId);
    const quote = available[Math.floor(Math.random() * available.length)];
    previousQuoteId = quote.id;
    sendJson(response, 200, quote);
    return;
  }

  sendJson(response, 404, {
    error: 'Route not found',
    availableRoutes: [
      'POST /api/auth/login',
      'GET /api/profile',
      'POST /api/auth/logout',
      'GET /api/quotes',
      'GET /api/quotes/random',
      'GET /health',
    ],
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('CCE106 API is running on http://localhost:' + PORT);
  console.log('Demo login: ' + DEMO_EMAIL + ' / ' + DEMO_PASSWORD);
  console.log('Protected profile: GET http://localhost:' + PORT + '/api/profile');
});