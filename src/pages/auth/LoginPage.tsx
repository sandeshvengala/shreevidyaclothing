import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../../data/ProductStore';
import { authConfigured } from '../../lib/supabase';

function GoogleIcon() {
  return <span aria-hidden="true" className="text-base font-bold normal-case">G</span>;
}

function LoginPage() {
  const { login, signInWithGoogle } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const destination = (location.state as { from?: string } | null)?.from || '/account';
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return setError('Enter your email and password to continue.');
    const result = await login(email, password);
    if (result.error) return setError(result.error);
    navigate(destination, { replace: true });
  };

  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle(destination);
    if (result.error) setError(result.error);
  };

  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-md border border-[#eadbc7] bg-white p-8 shadow-luxury">
        <p className="section-label">Account</p>
        <h1 className="section-heading mt-3 text-4xl">Login</h1>
        {!authConfigured && <p className="mt-4 text-sm text-maroon">Supabase login is not configured yet.</p>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="h-12 w-full border border-[#e3d5c7] px-4" />
          <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="h-12 w-full border border-[#e3d5c7] px-4" />
          <button type="submit" className="button-primary w-full">Sign In</button>
          <button type="button" onClick={handleGoogleLogin} className="button-secondary w-full"><GoogleIcon /> Continue with Google</button>
          {error && <p className="text-sm text-maroon">{error}</p>}
          <p className="text-center text-sm text-mutedBrown">New here? <Link to="/register" state={{ from: destination }} className="text-gold">Create an account</Link></p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
