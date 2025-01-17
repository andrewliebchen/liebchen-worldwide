import { withIronSessionApiRoute } from 'iron-session/next';
import { SESSION_CONFIG } from '../../../config/openai';

async function resetRoute(req, res) {
  console.log('API Reset: Starting reset route');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Reset query count
  req.session.queryCount = 0;
  await req.session.save();
  
  console.log('API Reset: Session reset, new query count:', req.session.queryCount);
  res.json({ queryCount: req.session.queryCount });
}

export default withIronSessionApiRoute(resetRoute, SESSION_CONFIG); 