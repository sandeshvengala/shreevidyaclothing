const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 120 }));

const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = process.env.SUPABASE_URL && supabaseSecretKey
  ? createClient(process.env.SUPABASE_URL, supabaseSecretKey)
  : null;
const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null;

async function requireUser(req, res, next) {
  if (!supabaseAdmin) return res.status(503).json({ error: 'Supabase server configuration is missing.' });
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Authentication required.' });
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return res.status(401).json({ error: 'Invalid authentication token.' });
  req.user = data.user;
  next();
}

function requireAdmin(req, res, next) {
  if (!supabaseAdmin) return res.status(503).json({ error: 'Supabase server configuration is missing.' });
  if (req.headers['x-admin-id'] !== process.env.ADMIN_ID || req.headers['x-admin-password'] !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Admin authentication required.' });
  }
  next();
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Shree Vidya Clothing API is running.', paymentsConfigured: Boolean(razorpay) });
});

app.post('/api/payments/create-order', requireUser, async (req, res) => {
  if (!razorpay) return res.status(503).json({ error: 'Razorpay server configuration is missing.' });
  const amount = Number(req.body.amount);
  if (!Number.isInteger(amount) || amount <= 0) return res.status(400).json({ error: 'A valid amount is required.' });
  try {
    const order = await razorpay.orders.create({ amount, currency: 'INR', receipt: `sv-${Date.now()}`, notes: { userId: req.user.id } });
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.status(502).json({ error: 'Unable to create Razorpay order.' });
  }
});

app.post('/api/payments/verify', requireUser, (req, res) => {
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body;
  if (!orderId || !paymentId || !signature || !process.env.RAZORPAY_KEY_SECRET) return res.status(400).json({ error: 'Incomplete payment verification data.' });
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex');
  if (expected !== signature) return res.status(400).json({ error: 'Payment signature verification failed.' });
  res.json({ verified: true });
});

app.get('/api/admin/overview', (req, res) => {
  res.json({
    revenue: '₹4.8L',
    orders: 124,
    customers: 436,
    products: 82,
    lowStock: 12,
    recentOrders: [
      { id: '#1001', customer: 'Aarohi S.', total: '₹8,990', status: 'Processing' },
      { id: '#1002', customer: 'Nisha M.', total: '₹12,400', status: 'Shipped' },
    ]
  });
});

app.post('/api/admin/products', requireAdmin, async (req, res) => {
  const { data, error } = await supabaseAdmin.from('products').upsert(req.body).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.delete('/api/admin/products/:id', requireAdmin, async (req, res) => {
  const { error } = await supabaseAdmin.from('products').delete().eq('id', Number(req.params.id));
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).end();
});

app.delete('/api/admin/products', requireAdmin, async (req, res) => {
  const { error } = await supabaseAdmin.from('products').delete().neq('id', 0);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).end();
});

app.post('/api/admin/campaign', requireAdmin, async (req, res) => {
  const { data, error } = await supabaseAdmin.from('offer_campaigns').upsert({ id: 1, ...req.body }).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.delete('/api/admin/campaign', requireAdmin, async (req, res) => {
  const { error } = await supabaseAdmin.from('offer_campaigns').delete().eq('id', 1);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
