/* =========================================================
   SHIVANI JAIN — GRAPHIC DESIGNER COMIC PORTFOLIO
   Interactive Features & Multi-Page Lightbox System
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Chapter Progress Rail ---------- */
  const progressFill = document.getElementById('progressFill');
  function updateProgress() {
    if (!progressFill) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Mobile Nav Toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navTabs = document.getElementById('navTabs');
  if (navToggle && navTabs) {
    navToggle.addEventListener('click', () => {
      const isOpen = navTabs.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navTabs.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navTabs.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active Chapter Highlighting ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-tab');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });
  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- Scroll Reveal for Panels & Bubbles ---------- */
  const revealTargets = document.querySelectorAll('.panel, .bubble--float');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Primary CTA: Explore My Work Scroll ---------- */
  const beginBtn = document.getElementById('beginReading');
  if (beginBtn) {
    beginBtn.addEventListener('click', () => {
      const targetSec = document.getElementById('projects') || document.getElementById('about');
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ---------- Intro Speech Bubble Wiggle Delight ---------- */
  const introBubble = document.getElementById('introBubble');
  if (introBubble) {
    introBubble.addEventListener('click', () => {
      introBubble.style.transform = 'rotate(4deg) scale(1.08)';
      setTimeout(() => { introBubble.style.transform = ''; }, 240);
    });
  }

  /* ---------- Chapter 2: Skill Filter Chips ---------- */
  const filterChips = document.querySelectorAll('#skillFilters .filter-chip');
  const skillBadges = document.querySelectorAll('#skillGrid .skill-badge');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      const filter = chip.dataset.filter;
      skillBadges.forEach(badge => {
        const cats = badge.dataset.category ? badge.dataset.category.split(' ') : [];
        const show = filter === 'all' || cats.includes(filter);
        badge.classList.toggle('hidden', !show);
      });
    });
  });

  /* =========================================================
     CHAPTER 3: PORTFOLIO GALLERY & MULTI-PAGE LIGHTBOX
     ========================================================= */
  const portfolioData = [
    {
      index: 0,
      issue: 'Issue №01',
      category: 'Product Advertising',
      filterGroup: 'advertising',
      title: 'Sound Beyond Limits',
      desc: 'A headphone promotional concept combining bold typography, dramatic scenery, and a clear product focus.',
      images: ['assets/projects/sound-beyond-limits.jpg'],
      pdfLink: null
    },
    {
      index: 1,
      issue: 'Issue №02',
      category: 'Beauty & Skincare',
      filterGroup: 'advertising',
      title: 'A Touch of Nature',
      desc: 'A skincare advertising concept using warm lighting, botanical details, and an elegant product-led layout.',
      images: ['assets/projects/a-touch-of-nature.jpg'],
      pdfLink: null
    },
    {
      index: 2,
      issue: 'Issue №03',
      category: 'Beauty & Skincare',
      filterGroup: 'advertising',
      title: 'Strawberry Lip Balm',
      desc: 'A vibrant lip balm creative combining strawberry imagery, expressive typography, and a cohesive red palette.',
      images: ['assets/projects/strawberry-lip-balm.jpg'],
      pdfLink: null
    },
    {
      index: 3,
      issue: 'Issue №04',
      category: 'Food & Beverage',
      filterGroup: 'advertising',
      title: 'Berry Bliss',
      desc: 'A smoothie promotional concept with dynamic fruit imagery, rich berry colors, and playful typography.',
      images: ['assets/projects/berry-bliss.jpg'],
      pdfLink: null
    },
    {
      index: 4,
      issue: 'Issue №05',
      category: 'Book Cover',
      filterGroup: 'editorial',
      title: 'The Quiet Power Within',
      desc: 'A book cover concept using a dramatic portrait, restrained colors, and strong typographic hierarchy.',
      images: ['assets/projects/the-quiet-power-within.jpg'],
      pdfLink: null
    },
    {
      index: 5,
      issue: 'Issue №06',
      category: 'Fashion & Accessories',
      filterGroup: 'advertising',
      title: 'Carry Your Story',
      desc: 'A handbag promotional creative balancing soft colors, elegant typography, and prominent product presentation.',
      images: ['assets/projects/carry-your-story.jpg'],
      pdfLink: null
    },
    {
      index: 6,
      issue: 'Issue №07',
      category: 'Social Media',
      filterGroup: 'social',
      title: 'Janmashtami — Brand Celebration',
      desc: 'A festive social media creative for Beta Soft Technology combining Krishna-inspired imagery with company branding.',
      images: ['assets/projects/janmashtami-brand-celebration.jpg'],
      pdfLink: null
    },
    {
      index: 7,
      issue: 'Issue №08',
      category: 'Social Media',
      filterGroup: 'social',
      title: 'Ambedkar Jayanti — Tribute Creative',
      desc: 'A commemorative social media design for Beta Soft Technology using portrait imagery and bold tribute typography.',
      images: ['assets/projects/ambedkar-jayanti-tribute.jpg'],
      pdfLink: null
    },
    {
      index: 8,
      issue: 'Issue №09',
      category: 'Editorial Design',
      filterGroup: 'editorial',
      title: 'Women’s Wellness — Editorial Design',
      desc: 'A multi-page wellness magazine featuring cover design, article layouts, imagery, and structured editorial typography.',
      images: ['assets/projects/womens-wellness-cover.jpg'],
      pdfLink: 'assets/projects/womens-wellness-magazine.pdf'
    },
    {
      index: 9,
      issue: 'Issue №10',
      category: 'Product Advertising',
      filterGroup: 'advertising',
      title: 'Elynn Apothecary — Signature Scent',
      desc: 'A luxury fragrance discovery set promotional creative combining warm organic textures, botanical accents, and elegant cosmetic typography.',
      images: ['assets/projects/elynn-signature-scent.jpg'],
      pdfLink: null
    },
    {
      index: 10,
      issue: 'Issue №11',
      category: 'Social Media',
      filterGroup: 'social',
      title: 'Duke Training Centre — Certification Campaign',
      desc: 'A multi-asset marketing and course promotion campaign for Duke Training Centre, featuring industry-aligned technical certifications, bold badging, and dynamic industrial imagery.',
      images: [
        'assets/projects/duke-welding-inspection-banner.png',
        'assets/projects/duke-lean-welding-banner.jpg',
        'assets/projects/duke-welding-inspector-program.jpg',
        'assets/projects/duke-nebosh-oil-gas.jpg'
      ],
      pdfLink: null
    },
    {
      index: 11,
      issue: 'Issue №12',
      category: 'Product Packaging',
      filterGroup: 'advertising',
      title: 'Infinity Packaging Solutions — Brand & Packaging Campaign',
      desc: 'A multi-banner marketing campaign for Infinity Packaging Solutions highlighting brand elevation, structural packaging materials, and memorable luxury unboxing experiences.',
      images: [
        'assets/projects/infinity-packaging-materials.jpg',
        'assets/projects/infinity-packaging-unboxing.jpg'
      ],
      pdfLink: null
    },
    {
      index: 12,
      issue: 'Issue №13',
      category: 'Social Media Promo',
      filterGroup: 'social',
      title: 'KlugKlug — Influencer Intelligence Campaign',
      desc: 'A high-impact promotional campaign creative for KlugKlug, combining 3D gift elements, voucher coupon badges, and high-conversion marketing typography.',
      images: [
        'assets/projects/klugklug-influencer-offer.jpg'
      ],
      pdfLink: null
    },
    {
      index: 13,
      issue: 'Issue №14',
      category: 'B2B Tech Marketing',
      filterGroup: 'social',
      title: 'Magic Infomedia — Data Scraping Services',
      desc: 'A modern B2B tech promotional design for Magic Infomedia highlighting web data extraction, multiple export formats, and clear lead-generation CTAs.',
      images: [
        'assets/projects/magic-infomedia-data-scraping.jpg'
      ],
      pdfLink: null
    },
    {
      index: 14,
      issue: 'Issue №15',
      category: 'Social Media',
      filterGroup: 'social',
      title: 'Rabindranath Tagore Jayanti — Tribute Creative',
      desc: 'A commemorative social media tribute design for Team Magento celebrating Rabindranath Tagore Jayanti, pairing expressive script typography with an artistic portrait illustration and literary quote.',
      images: [
        'assets/projects/tagore-jayanti-tribute.jpg'
      ],
      pdfLink: null
    }
  ];

  let currentFilteredList = [...portfolioData];
  let currentProjectIndex = 0;
  let currentImageSubIndex = 0;
  let lastFocusedElement = null;

  /* Gallery Filter Tabs */
  const galleryChips = document.querySelectorAll('#galleryFilters .filter-chip');
  const workCards = document.querySelectorAll('#galleryGrid .work-card');

  galleryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      galleryChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');

      const filter = chip.dataset.galleryFilter;
      workCards.forEach(card => {
        const cat = card.dataset.category;
        const isMatch = filter === 'all' || cat === filter;
        card.classList.toggle('hidden', !isMatch);
      });

      if (filter === 'all') {
        currentFilteredList = [...portfolioData];
      } else {
        currentFilteredList = portfolioData.filter(item => item.filterGroup === filter);
      }
    });
  });

  /* Lightbox Elements */
  const lightbox = document.getElementById('comicLightbox');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxIssue = document.getElementById('lightboxIssue');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxPageCounter = document.getElementById('lightboxPageCounter');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxThumbStrip = document.getElementById('lightboxThumbStrip');
  const lightboxExtraAction = document.getElementById('lightboxExtraAction');

  function renderLightbox() {
    if (!lightbox || currentFilteredList.length === 0) return;
    const project = currentFilteredList[currentProjectIndex];
    if (!project) return;

    const totalImages = project.images.length;
    if (currentImageSubIndex >= totalImages) currentImageSubIndex = 0;
    if (currentImageSubIndex < 0) currentImageSubIndex = totalImages - 1;

    lightboxIssue.textContent = project.issue;
    lightboxCategory.textContent = project.category;
    lightboxTitle.textContent = project.title;
    lightboxDesc.textContent = project.desc;

    // Image Stage
    const activeSrc = project.images[currentImageSubIndex];
    lightboxImg.src = activeSrc;
    lightboxImg.alt = `${project.title} — Item ${currentImageSubIndex + 1} of ${totalImages}`;

    // Page Counter
    if (totalImages > 1) {
      lightboxPageCounter.textContent = `${currentImageSubIndex + 1} / ${totalImages}`;
      lightboxPageCounter.classList.add('active');
    } else {
      lightboxPageCounter.textContent = '';
      lightboxPageCounter.classList.remove('active');
    }

    // Thumbnails Strip
    if (totalImages > 1) {
      lightboxThumbStrip.innerHTML = '';
      project.images.forEach((imgSrc, idx) => {
        const thumbBtn = document.createElement('button');
        thumbBtn.type = 'button';
        thumbBtn.className = `lightbox-thumb ${idx === currentImageSubIndex ? 'active' : ''}`;
        thumbBtn.setAttribute('aria-label', `Go to image ${idx + 1}`);
        thumbBtn.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${idx + 1}">`;
        thumbBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          currentImageSubIndex = idx;
          renderLightbox();
        });
        lightboxThumbStrip.appendChild(thumbBtn);
      });
      lightboxThumbStrip.classList.add('active');
    } else {
      lightboxThumbStrip.innerHTML = '';
      lightboxThumbStrip.classList.remove('active');
    }

    // Extra action (e.g. PDF viewer)
    if (lightboxExtraAction) {
      if (project.pdfLink) {
        lightboxExtraAction.innerHTML = `
          <a href="${project.pdfLink}" target="_blank" rel="noopener" class="btn-design-view btn-design-view--outline">
            Open Full PDF Magazine <span class="arrow">&nearr;</span>
          </a>
        `;
      } else {
        lightboxExtraAction.innerHTML = '';
      }
    }
  }

  function openLightbox(dataIndex) {
    const foundIndex = currentFilteredList.findIndex(item => item.index === dataIndex);
    if (foundIndex !== -1) {
      currentProjectIndex = foundIndex;
    } else {
      currentProjectIndex = 0;
    }
    currentImageSubIndex = 0;

    lastFocusedElement = document.activeElement;
    renderLightbox();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function showNext() {
    if (currentFilteredList.length === 0) return;
    const project = currentFilteredList[currentProjectIndex];
    if (project && project.images.length > 1) {
      if (currentImageSubIndex < project.images.length - 1) {
        currentImageSubIndex++;
        renderLightbox();
        return;
      }
    }
    // Advance to next project
    currentProjectIndex = (currentProjectIndex + 1) % currentFilteredList.length;
    currentImageSubIndex = 0;
    renderLightbox();
  }

  function showPrev() {
    if (currentFilteredList.length === 0) return;
    const project = currentFilteredList[currentProjectIndex];
    if (project && project.images.length > 1) {
      if (currentImageSubIndex > 0) {
        currentImageSubIndex--;
        renderLightbox();
        return;
      }
    }
    // Back to previous project
    currentProjectIndex = (currentProjectIndex - 1 + currentFilteredList.length) % currentFilteredList.length;
    const prevProj = currentFilteredList[currentProjectIndex];
    currentImageSubIndex = prevProj && prevProj.images.length > 1 ? prevProj.images.length - 1 : 0;
    renderLightbox();
  }

  /* Bind Card Click & Keyboard Triggers */
  document.querySelectorAll('.btn-design-view[data-index]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.index, 10);
      openLightbox(idx);
    });
  });

  document.querySelectorAll('.work-preview').forEach(preview => {
    const card = preview.closest('.work-card');
    const idx = parseInt(card.dataset.index, 10);
    preview.addEventListener('click', () => openLightbox(idx));
    preview.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

  /* Touch swipe support for lightbox on mobile */
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        showNext();
      } else if (touchEndX - touchStartX > 50) {
        showPrev();
      }
    }, { passive: true });
  }

  /* ---------- Easter Egg: Bonus Canvas (Press 'C') ---------- */
  const secretPage = document.getElementById('secretPage');
  const closeSecret = document.getElementById('closeSecret');

  if (closeSecret && secretPage) {
    closeSecret.addEventListener('click', () => {
      secretPage.classList.remove('open');
      secretPage.setAttribute('aria-hidden', 'true');
    });
    secretPage.addEventListener('click', (e) => {
      if (e.target === secretPage) {
        secretPage.classList.remove('open');
        secretPage.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* Global Keyboard Shortcut Handler */
  document.addEventListener('keydown', (e) => {
    // Check if user is typing in an editable field
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    const isInput = activeTag === 'input' || activeTag === 'textarea' || (document.activeElement && document.activeElement.isContentEditable);
    if (isInput) return;

    // Handle Lightbox keys
    if (lightbox && lightbox.classList.contains('open')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNext();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      }
      return;
    }

    // Handle Easter Egg key ('C')
    if (secretPage) {
      if (e.key && e.key.toLowerCase() === 'c' && !secretPage.classList.contains('open')) {
        secretPage.classList.add('open');
        secretPage.setAttribute('aria-hidden', 'false');
      } else if (e.key === 'Escape' && secretPage.classList.contains('open')) {
        secretPage.classList.remove('open');
        secretPage.setAttribute('aria-hidden', 'true');
      }
    }
  });

  /* ---------- Dynamic Copyright Year ---------- */
  const copyYear = document.getElementById('copyrightYear');
  if (copyYear) {
    copyYear.textContent = new Date().getFullYear();
  }

});