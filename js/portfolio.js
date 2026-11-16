/**
 * Module: Dynamic Category Carousel & Fullscreen Lightbox
 * Features:
 * - Switches photo collection by category (Marriage, Wedding, Pre-Wedding, Fashion)
 * - Horizontal smooth scrolling with Left & Right arrows
 * - Click any photo to open HD Lightbox popup
 */

const PHOTO_DATABASE = [
  // --- 1. MARRIAGE & RITUALS ---
  {
    category: 'marriage',
    title: 'Hastamelap & Sacred Vows',
    tag: 'Marriage Rituals',
    desc: 'The pure divine union captured amidst golden havan flames.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'marriage',
    title: 'Heritage Bridal Grace',
    tag: 'Marriage Rituals',
    desc: 'Intricate henna, gold jewelry & timeless bridal portraits.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'marriage',
    title: 'Mangalashtak & Pheras',
    tag: 'Marriage Rituals',
    desc: 'Emotions of seven sacred vows surrounded by loved ones.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'marriage',
    title: 'Sindoor Daan Moment',
    tag: 'Marriage Rituals',
    desc: 'A priceless moment of heartfelt love and tradition.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'marriage',
    title: 'Vidaai Tears & Blessings',
    tag: 'Marriage Rituals',
    desc: 'Raw authentic family blessings and emotional farewells.',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=900&auto=format&fit=crop'
  },

  // --- 2. ROYAL WEDDINGS ---
  {
    category: 'wedding',
    title: 'Udaipur Palace Celebration',
    tag: 'Royal Wedding',
    desc: 'Grand royal destination nuptials with 8K cinematic palettes.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'wedding',
    title: 'Sunset Lake Garland Exchange',
    tag: 'Royal Wedding',
    desc: 'Golden hour lakeside reflections and royal entry.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'wedding',
    title: 'The Royal Baraat Entry',
    tag: 'Royal Wedding',
    desc: 'Vintage cars, brass band energy, and grand floral shower.',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'wedding',
    title: 'Candlelight Sangeet Glamour',
    tag: 'Royal Wedding',
    desc: 'Glamorous couple dance performance under fairy lights.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=900&auto=format&fit=crop'
  },

  // --- 3. PRE-WEDDING ---
  {
    category: 'prewedding',
    title: 'Twilight Horizon Romance',
    tag: 'Pre-Wedding',
    desc: 'Dreamy mountain sunset shoot with cinematic backlight.',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'prewedding',
    title: 'Coastal Shoreline Breeze',
    tag: 'Pre-Wedding',
    desc: 'Candid laughter, ocean waves, and aerial drone framing.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'prewedding',
    title: 'Heritage Fort Whispers',
    tag: 'Pre-Wedding',
    desc: 'Royalty meets romance in ancient historic sandstone arches.',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'prewedding',
    title: 'Bohemian Meadow Sunset',
    tag: 'Pre-Wedding',
    desc: 'Soft golden hour glows in natural rustic fields.',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop'
  },

  // --- 4. FASHION & EDITORIAL ---
  {
    category: 'fashion',
    title: 'Vogue Editorial High-Key',
    tag: 'Fashion & Model',
    desc: 'Sharp international studio lighting and color grading.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'fashion',
    title: 'Haute Couture Avant-Garde',
    tag: 'Fashion & Model',
    desc: 'Dynamic fashion portraits for magazine lookbooks.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'fashion',
    title: 'Cinematic Monochromatic Portrait',
    tag: 'Fashion & Model',
    desc: 'Sculpted chiaroscuro shadows and expressive mood.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop'
  },
  {
    category: 'fashion',
    title: 'Golden Hour Street Glamour',
    tag: 'Fashion & Model',
    desc: 'Urban modern chic styling with natural sunflare.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop'
  }
];

export function initPortfolio() {
  const track = document.getElementById('galleryTrack');
  const tabs = document.querySelectorAll('.gallery-tab-btn');
  const prevBtn = document.getElementById('galleryPrevBtn');
  const nextBtn = document.getElementById('galleryNextBtn');

  if (!track) return;

  // Render cards for category
  const renderCategory = (cat) => {
    track.innerHTML = '';
    const filtered = PHOTO_DATABASE.filter(item => item.category === cat);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'photo-card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="card-overlay">
          <span class="card-tag"><i class="fa-solid fa-camera"></i> ${item.tag}</span>
          <h4 class="card-title">${item.title}</h4>
          <p class="card-desc">${item.desc}</p>
        </div>
      `;

      // Lightbox click trigger
      card.addEventListener('click', () => {
        openLightbox(item.image, item.title, item.tag);
      });

      track.appendChild(card);
    });

    // Reset scroll to beginning
    track.scrollTo({ left: 0, behavior: 'smooth' });
  };

  // Tab click listeners
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderCategory(cat);
    });
  });

  // Left & Right Arrow Scrolling
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      const scrollAmount = track.clientWidth * 0.75;
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const scrollAmount = track.clientWidth * 0.75;
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Initial Load: Marriage Category
  renderCategory('marriage');
  initLightboxModal();
}

// Lightbox Modal Logic
function openLightbox(src, title, tag) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  if (modal && img && caption) {
    img.src = src;
    caption.innerHTML = `<strong>${title}</strong> &bull; <span>${tag}</span>`;
    modal.classList.add('active');
  }
}

function initLightboxModal() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxClose');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}
