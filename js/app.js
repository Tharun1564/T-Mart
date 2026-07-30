function showToast(message) {
  const root = document.getElementById('toastRoot');
  if (!root) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  root.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}
window.showToast = showToast;

function initTheme() {
  const savedTheme = Storage.getTheme();
  const isDark = savedTheme === 'dark';
  document.body.classList.toggle('dark', isDark);
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.textContent = isDark ? '🌙' : '☀️';
    btn.addEventListener('click', () => {
      const next = document.body.classList.contains('dark') ? 'light' : 'dark';
      document.body.classList.toggle('dark', next === 'dark');
      Storage.saveTheme(next);
      btn.textContent = next === 'dark' ? '🌙' : '☀️';
      showToast(`Switched to ${next} mode`);
    });
  }
}

function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });
  elements.forEach((element) => observer.observe(element));
}

function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 400 ? 'grid' : 'none';
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function renderProductSkeleton(target, count = 4) {
  if (!target) return;
  target.innerHTML = Array.from({ length: count }, () => '<article class="product-card skeleton-card"></article>').join('');
}

function initHomePage() {
  const categoryGrid = document.getElementById('categoryGrid');
  const trendingProducts = document.getElementById('trendingProducts');
  const newArrivals = document.getElementById('newArrivals');
  const brandGrid = document.getElementById('brandGrid');
  if (!categoryGrid && !trendingProducts && !newArrivals && !brandGrid) return;
  const categories = ProductService.getCategories();
  const brands = ProductService.getBrands();
  categoryGrid.innerHTML = categories.slice(0, 4).map((category) => `<div class="category-card"><h3>${category}</h3><p>Crafted essentials for ${category.toLowerCase()} lovers.</p></div>`).join('');
  renderProductSkeleton(trendingProducts, 4);
  renderProductSkeleton(newArrivals, 4);
  setTimeout(() => {
    trendingProducts.innerHTML = ProductService.getTrending(4).map((product) => renderProductCard(product)).join('');
    newArrivals.innerHTML = ProductService.getNewArrivals(4).map((product) => renderProductCard(product)).join('');
  }, 350);
  brandGrid.innerHTML = brands.slice(0, 4).map((brand) => `<div class="brand-card"><h3>${brand}</h3><p>Luxury quality and modern design.</p></div>`).join('');
}

function renderProductCard(product) {
  const isWishlisted = wishlistManager?.isInWishlist(product.id);
  return `
    <article class="product-card">
      <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="product-meta"><span class="tag">${product.category}</span><span>${product.stock}</span></div>
      <h3>${product.name}</h3>
      <div class="price-row"><span class="price">$${product.price}</span><span class="old-price">$${Math.round(product.price * 1.2)}</span></div>
      <p>${product.description}</p>
      <div class="actions">
        <button class="btn btn-primary" data-action="add-cart" data-id="${product.id}">Add to cart</button>
        <button class="btn btn-secondary" data-action="toggle-wishlist" data-id="${product.id}">${isWishlisted ? '♥' : '♡'}</button>
      </div>
      <div class="actions">
        <a class="btn btn-secondary" href="product.html?id=${product.id}">Quick view</a>
        <a class="btn btn-secondary" href="checkout.html">Buy now</a>
      </div>
    </article>
  `;
}

function initShopPage() {
  const grid = document.getElementById('shopProducts');
  const resultsInfo = document.getElementById('resultsInfo');
  const categoryFilter = document.getElementById('categoryFilter');
  const brandFilter = document.getElementById('brandFilter');
  const priceFilter = document.getElementById('priceFilter');
  const priceValue = document.getElementById('priceValue');
  const ratingFilter = document.getElementById('ratingFilter');
  const discountFilter = document.getElementById('discountFilter');
  const availabilityFilter = document.getElementById('availabilityFilter');
  const sortFilter = document.getElementById('sortFilter');
  if (!grid) return;
  const categories = ['all', ...ProductService.getCategories()];
  const brands = ['all', ...ProductService.getBrands()];
  if (categoryFilter) categoryFilter.innerHTML = categories.map((category) => `<option value="${category}">${category === 'all' ? 'All' : category}</option>`).join('');
  if (brandFilter) brandFilter.innerHTML = brands.map((brand) => `<option value="${brand}">${brand === 'all' ? 'All' : brand}</option>`).join('');
  const renderProducts = () => {
    renderProductSkeleton(grid, 8);
    const filters = {
      query: document.getElementById('globalSearch')?.value || '',
      category: categoryFilter?.value || 'all',
      brand: brandFilter?.value || 'all',
      price: priceFilter?.value || 500,
      rating: ratingFilter?.value || 0,
      discount: discountFilter?.value || 0,
      availability: availabilityFilter?.value || 'all',
      sort: sortFilter?.value || 'featured'
    };
    const items = ProductService.filterProducts(filters);
    setTimeout(() => {
      grid.innerHTML = items.map((product) => renderProductCard(product)).join('');
    }, 280);
    if (resultsInfo) resultsInfo.textContent = `${items.length} products found`;
    if (priceValue) priceValue.textContent = `Up to $${priceFilter.value}`;
  };
  [categoryFilter, brandFilter, priceFilter, ratingFilter, discountFilter, availabilityFilter, sortFilter].forEach((element) => {
    element?.addEventListener('change', renderProducts);
  });
  document.getElementById('globalSearch')?.addEventListener('input', renderProducts);
  renderProducts();
}

function initProductDetailPage() {
  const layout = document.getElementById('productDetailLayout');
  const related = document.getElementById('relatedProducts');
  if (!layout) return;
  const params = new URLSearchParams(window.location.search);
  const product = ProductService.getById(params.get('id'));
  if (!product) {
    layout.innerHTML = '<div class="empty-state">Product not found</div>';
    return;
  }
  const viewed = Storage.getRecentlyViewed();
  const nextViewed = [product.id, ...viewed.filter((id) => id !== product.id)].slice(0, 6);
  Storage.saveRecentlyViewed(nextViewed);
  layout.innerHTML = `
    <div class="detail-gallery">
      <div class="gallery-main"><img src="${product.image}" alt="${product.name}" id="detailImage" /></div>
      <div class="gallery-thumbs">
        <img class="gallery-thumb active" src="${product.image}" alt="${product.name}" />
        <img class="gallery-thumb" src="${product.image}" alt="${product.name}" />
      </div>
    </div>
    <div>
      <p class="eyebrow">${product.category}</p>
      <h1>${product.name}</h1>
      <p>${product.description}</p>
      <div class="price-row"><span class="price">$${product.price}</span><span class="old-price">$${Math.round(product.price * 1.2)}</span></div>
      <p>${product.rating} ★ • ${product.reviews} reviews</p>
      <div class="actions">
        <button class="btn btn-primary" data-action="add-cart" data-id="${product.id}">Add to cart</button>
        <button class="btn btn-secondary" data-action="toggle-wishlist" data-id="${product.id}">Add to wishlist</button>
      </div>
      <div class="actions"><button class="btn btn-secondary" id="zoomButton">Zoom image</button><button class="btn btn-secondary" id="backHome">Back home</button></div>
    </div>
  `;
  if (related) related.innerHTML = ProductService.getTrending(4).map((item) => renderProductCard(item)).join('');
  const viewedIds = Storage.getRecentlyViewed().filter((id) => id !== product.id);
  if (viewedIds.length) {
    const viewedSection = document.createElement('section');
    viewedSection.className = 'products-section reveal';
    viewedSection.innerHTML = `<div class="section-head"><div><p class="eyebrow">Recently viewed</p><h2>Continue where you left off</h2></div></div><div class="product-grid">${viewedIds.slice(0, 4).map((id) => renderProductCard(ProductService.getById(id))).join('')}</div>`;
    layout.appendChild(viewedSection);
  }
  document.getElementById('zoomButton')?.addEventListener('click', () => {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = product.image;
    modal.classList.add('active');
  });
  document.getElementById('closeModal')?.addEventListener('click', () => document.getElementById('imageModal').classList.remove('active'));
  document.getElementById('backHome')?.addEventListener('click', () => window.location.href = 'index.html');
}

function initLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (!overlay) return;
  setTimeout(() => overlay.classList.remove('active'), 700);
}

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Subscribed successfully');
    form.reset();
  });
}

function initContactAndFaq() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      showToast('Message sent successfully');
      form.reset();
    });
  }
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) showToast('FAQ expanded');
    });
  });
}

function initGlobalCounters() {
  const wishlistCount = document.getElementById('wishlistCount');
  if (wishlistCount) wishlistCount.textContent = Storage.getWishlist().length;
  const cartCount = document.getElementById('cartCount');
  if (cartCount) cartCount.textContent = Storage.getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function init() {
  initTheme();
  initRevealAnimations();
  initNavToggle();
  initScrollTop();
  initLoading();
  initNewsletter();
  initContactAndFaq();
  initGlobalCounters();
  initHomePage();
  initShopPage();
  initProductDetailPage();
  if (window.cartManager) cartManager.render();
  if (window.wishlistManager) wishlistManager.render();
}

document.addEventListener('DOMContentLoaded', init);

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action="add-cart"]');
  if (!button) return;
  button.classList.add('ripple');
  cartManager.add(Number(button.getAttribute('data-id')));
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action="toggle-wishlist"]');
  if (!button) return;
  button.classList.add('ripple');
  wishlistManager.toggle(Number(button.getAttribute('data-id')));
  button.textContent = wishlistManager.isInWishlist(Number(button.getAttribute('data-id'))) ? '♥' : '♡';
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('active');
  }
});
