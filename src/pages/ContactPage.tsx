import { useState } from 'react';

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container-shell py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="section-label">Contact</p>
          <h1 className="section-heading mt-3">Let’s Create Your Next Story</h1>
          <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="mt-8 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <input type="text" placeholder="Name" className="h-12 border border-[#e4d8cb] bg-white px-4" />
              <input type="email" placeholder="Email" className="h-12 border border-[#e4d8cb] bg-white px-4" />
            </div>
            <input type="tel" placeholder="Phone" className="h-12 w-full border border-[#e4d8cb] bg-white px-4" />
            <textarea rows={6} placeholder="Message" className="w-full border border-[#e4d8cb] bg-white p-4" />
            <button type="submit" className="button-primary">Send message</button>
            {sent && <p className="text-sm text-maroon">Thank you. We&apos;ll be in touch shortly.</p>}
          </form>
        </div>
        <div className="space-y-6 rounded-none border border-[#eadcc8] bg-white p-8">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">Email</p>
            <p className="mt-3 text-lg text-deepBrown">hello@shreevidyaclotthing.com</p>
          </div>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">Phone</p>
            <p className="mt-3 text-lg text-deepBrown">+91 98765 43210</p>
          </div>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">Address</p>
            <p className="mt-3 max-w-sm text-lg leading-8 text-mutedBrown">12 Heritage Lane, Bengaluru, Karnataka, India.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
