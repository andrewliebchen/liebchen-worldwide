import { withIronSessionApiRoute } from 'iron-session/next';
import { SESSION_CONFIG, isAIEnabled } from '../../../config/openai';

async function countRoute(req, res) {
  console.log('API Count: Starting count route');
  console.log('API Count: Session ID:', req.session.id);
  console.log('API Count: Query count:', req.session.queryCount);

  if (req.method !== 'GET') {
    console.log('API Count: Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Initialize query count if not exists
  if (typeof req.session.queryCount === 'undefined') {
    console.log('API Count: Initializing query count');
    req.session.queryCount = 0;
    await req.session.save();
  }

  console.log('API Count: Returning query count:', req.session.queryCount);
  res.json({ 
    queryCount: req.session.queryCount,
    aiEnabled: isAIEnabled()
  });
}

export default withIronSessionApiRoute(countRoute, SESSION_CONFIG); 