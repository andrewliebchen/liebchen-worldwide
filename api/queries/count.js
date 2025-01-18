import { withIronSessionApiRoute } from 'iron-session/next';
import { SESSION_CONFIG, isAIEnabled } from '../../config/openai';

async function countRoute(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.json({ 
    queryCount: req.session.queryCount || 0,
    aiEnabled: isAIEnabled()
  });
}

export default withIronSessionApiRoute(countRoute, SESSION_CONFIG); 