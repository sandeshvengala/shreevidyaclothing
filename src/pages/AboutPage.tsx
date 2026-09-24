function AboutPage() {
  return (
    <div className="container-shell py-16">
      <div className="text-center">
        <p className="section-label">About us</p>
        <h1 className="section-heading mt-3">WEAR YOUR STORY</h1>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80" alt="Shree Vidya Clothing" className="h-[600px] w-full object-cover" />
        <div className="space-y-6 text-lg leading-8 text-mutedBrown">
          <p>
            Shree Vidya Clothing brings together refined silhouettes, accessible luxury and modern Indian femininity in one carefully considered wardrobe.
          </p>
          <p>
            Our philosophy is simple: clothing should feel elegant, empowering and deeply personal. Each edit is designed for moments that deserve to be remembered.
          </p>
          <p>
            From celebratory dressing to everyday grace, every collection is shaped by thoughtful details and an enduring sense of ease.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
