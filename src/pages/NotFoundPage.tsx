import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container-shell py-24 text-center">
      <p className="section-label">404</p>
      <h1 className="section-heading mt-3 text-5xl md:text-6xl">THIS STORY HASN'T BEEN WRITTEN YET.</h1>
      <Link to="/" className="button-primary mt-8">Return Home</Link>
    </div>
  );
}

export default NotFoundPage;
