import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../../data/ProductStore';
import { authConfigured } from '../../lib/supabase';

function RegisterPage() {
  const { register } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const destination = (location.state as { from?: string } | null)?.from || '/account';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await register(form.name, form.email, form.password);
    if (result.error) return setError(result.error);
    navigate(destination, { replace: true });
  };

  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-md border border-[#eadbc7] bg-white p-8 shadow-luxury">
        <p className="section-label">New here</p>
        <h1 className="section-heading mt-3 text-4xl">Create Account</h1>
        {!authConfigured && <p className="mt-4 text-sm text-maroon">Supabase login is not configured yet.</p>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input required type="text" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Full Name" className="h-12 w-full border border-[#e3d5c7] px-4" />
          <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email address" className="h-12 w-full border border-[#e3d5c7] px-4" />
          <input required minLength={6} type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Password (6+ characters)" className="h-12 w-full border border-[#e3d5c7] px-4" />
          <button type="submit" className="button-primary w-full">Register</button>
          {error && <p className="text-sm text-maroon">{error}</p>}
          <p className="text-center text-sm text-mutedBrown">Already registered? <Link to="/login" state={{ from: destination }} className="text-gold">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
