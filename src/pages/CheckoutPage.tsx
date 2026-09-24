import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts, type Address } from '../data/ProductStore';
import { supabase } from '../lib/supabase';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const emptyAddress: Address = { fullName: '', phone: '', address: '', city: '', state: '', postalCode: '', country: 'India' };

function CheckoutPage() {
  const { user, cart, saveAddress, clearCart } = useProducts();
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address>(user?.address || { ...emptyAddress, fullName: user?.name || '', phone: user?.phone || '' });
  const [payment, setPayment] = useState('cod');
  const [error, setError] = useState('');
  const [placed, setPlaced] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!user) {
    navigate('/login', { replace: true, state: { from: '/checkout' } });
    return null;
  }
  if (!cart.length && !placed) return <div className="container-shell py-16 text-center"><h1 className="section-heading">Your bag is empty</h1><Link to="/#new-arrivals" className="button-primary mt-8">Explore products</Link></div>;
  if (placed) return <div className="container-shell py-20 text-center"><p className="section-label">Order confirmed</p><h1 className="section-heading mt-3">Thank you, {user.name}</h1><p className="mx-auto mt-5 max-w-lg text-mutedBrown">Your order has been placed successfully. We&apos;ll send confirmation details to {user.email}.</p><Link to="/account" className="button-primary mt-8">View my account</Link></div>;

  const updateAddress = (field: keyof Address, value: string) => setAddress((current) => ({ ...current, [field]: value }));
  const finishOrder = () => {
    saveAddress(address);
    clearCart();
    setPlaced(true);
  };

  const placeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.values(address).some((value) => !value.trim())) return setError('Please complete all delivery details.');
    if (payment === 'cod') return finishOrder();
    if (!supabase) return setError('Supabase is not configured.');
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) return setError('Your session expired. Please sign in again.');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const orderResponse = await fetch(`${apiUrl}/api/payments/create-order`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ amount: total * 100 }) });
      const order = await orderResponse.json();
      if (!orderResponse.ok) return setError(order.error || 'Unable to start payment.');
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => { const script = document.createElement('script'); script.src = 'https://checkout.razorpay.com/v1/checkout.js'; script.onload = () => resolve(); script.onerror = () => reject(new Error('Razorpay failed to load.')); document.body.appendChild(script); });
      }
      const paymentResult = await new Promise<{ razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }>((resolve, reject) => {
        const checkout = new window.Razorpay({ key: order.keyId, amount: order.amount, currency: order.currency, name: 'Shree Vidya Clothing', description: 'Order payment', order_id: order.orderId, prefill: { name: address.fullName, email: user.email, contact: address.phone }, theme: { color: '#B88A5A' }, handler: resolve, modal: { ondismiss: () => reject(new Error('Payment cancelled.')) } });
        checkout.open();
      });
      const verifyResponse = await fetch(`${apiUrl}/api/payments/verify`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(paymentResult) });
      const verification = await verifyResponse.json();
      if (!verifyResponse.ok || !verification.verified) return setError(verification.error || 'Payment verification failed.');
      finishOrder();
    } catch (paymentError) {
      setError(paymentError instanceof Error ? paymentError.message : 'Payment could not be completed.');
    }
  };

  return <div className="container-shell py-16"><p className="section-label">Secure checkout</p><h1 className="section-heading mt-3">Complete your order</h1><form onSubmit={placeOrder} className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"><div className="space-y-6"><div className="border border-[#eadcc8] bg-white p-6"><h2 className="text-xs uppercase tracking-[0.2em] text-gold">Customer details</h2><div className="mt-5 grid gap-5 md:grid-cols-2"><input value={address.fullName} onChange={(e) => updateAddress('fullName', e.target.value)} required placeholder="Full Name" className="h-12 border border-[#e3d5c7] px-4" /><input value={user.email} readOnly type="email" className="h-12 border border-[#e3d5c7] bg-[#f8f3ed] px-4" /><input value={address.phone} onChange={(e) => updateAddress('phone', e.target.value)} required type="tel" placeholder="Phone" className="h-12 border border-[#e3d5c7] px-4 md:col-span-2" /></div></div><div className="border border-[#eadcc8] bg-white p-6"><h2 className="text-xs uppercase tracking-[0.2em] text-gold">Shipping address</h2><div className="mt-5 grid gap-5 md:grid-cols-2"><input value={address.address} onChange={(e) => updateAddress('address', e.target.value)} required placeholder="Address" className="h-12 border border-[#e3d5c7] px-4 md:col-span-2" /><input value={address.city} onChange={(e) => updateAddress('city', e.target.value)} required placeholder="City" className="h-12 border border-[#e3d5c7] px-4" /><input value={address.state} onChange={(e) => updateAddress('state', e.target.value)} required placeholder="State" className="h-12 border border-[#e3d5c7] px-4" /><input value={address.postalCode} onChange={(e) => updateAddress('postalCode', e.target.value)} required placeholder="Postal code" className="h-12 border border-[#e3d5c7] px-4" /><input value={address.country} onChange={(e) => updateAddress('country', e.target.value)} required placeholder="Country" className="h-12 border border-[#e3d5c7] px-4" /></div></div><div className="border border-[#eadcc8] bg-white p-6"><h2 className="text-xs uppercase tracking-[0.2em] text-gold">Payment method</h2><div className="mt-5 space-y-3 text-sm text-deepBrown"><label className="flex items-center gap-3"><input type="radio" checked={payment === 'cod'} onChange={() => setPayment('cod')} /> Cash on delivery</label><label className="flex items-center gap-3"><input type="radio" checked={payment === 'upi'} onChange={() => setPayment('upi')} /> UPI / online payment</label><label className="flex items-center gap-3"><input type="radio" checked={payment === 'card'} onChange={() => setPayment('card')} /> Credit or debit card</label></div></div></div><aside className="h-fit border border-[#eadcc8] bg-white p-6 shadow-luxury"><h2 className="text-xs uppercase tracking-[0.2em] text-gold">Order summary</h2><div className="mt-6 space-y-4 text-sm text-mutedBrown">{cart.map(({ product, quantity }) => <div key={product.id} className="flex justify-between gap-4"><span>{product.name} × {quantity}</span><span>₹{(product.price * quantity).toLocaleString('en-IN')}</span></div>)}<div className="flex justify-between border-t border-[#eadcc8] pt-4 text-base font-medium text-deepBrown"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div></div><button type="submit" className="button-primary mt-6 w-full">Place order</button>{error && <p className="mt-3 text-sm text-maroon">{error}</p>}</aside></form></div>;
}

export default CheckoutPage;
