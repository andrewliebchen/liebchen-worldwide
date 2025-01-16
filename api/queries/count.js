import { withIronSessionApiRoute } from 'iron-session/next';

const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'andrew_ai_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 // 24 hours
  }
};

async function countRoute(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.json({ queryCount: req.session.queryCount || 0 });
}

export default withIronSessionApiRoute(countRoute, sessionOptions); 