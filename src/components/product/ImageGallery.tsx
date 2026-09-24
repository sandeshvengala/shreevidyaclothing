import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useState } from 'react';

function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden border border-[#eadac4] bg-white">
        <img
          src={images[active]}
          alt="Product gallery"
          className="h-[520px] w-full object-cover md:h-[660px]"
        />
        <button
          onClick={() => setFullscreen(true)}
          className="absolute right-4 top-4 inline-flex items-center gap-2 border border-white bg-white/80 px-3 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-deepBrown backdrop-blur-sm"
        >
          <Expand size={14} />
          Fullscreen
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setActive(index)}
            className={`overflow-hidden border ${active === index ? 'border-gold' : 'border-[#e5d8c7]'}`}
          >
            <img src={image} alt="Thumbnail" className="h-24 w-full object-cover" />
          </button>
        ))}
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#241A15]/80 p-6">
          <div className="relative max-w-5xl w-full bg-white p-4">
            <button onClick={() => setFullscreen(false)} className="absolute right-4 top-4 text-deepBrown">
              <X size={24} />
            </button>
            <img src={images[active]} alt="Expanded product" className="h-[80vh] w-full object-cover" />
            <div className="mt-4 flex items-center justify-between">
              <button onClick={() => setActive((active - 1 + images.length) % images.length)} className="border border-[#eadac4] p-2">
                <ChevronLeft size={18} />
              </button>
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-deepBrown">Image {active + 1} / {images.length}</span>
              <button onClick={() => setActive((active + 1) % images.length)} className="border border-[#eadac4] p-2">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
