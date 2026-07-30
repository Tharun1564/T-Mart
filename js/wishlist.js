class WishlistManager {
  constructor() {
    this.items = Storage.getWishlist();
  }

  getItems() {
    return this.items;
  }

  add(productId) {
    if (!this.items.includes(productId)) {
      this.items.push(productId);
      Storage.saveWishlist(this.items);
      this.render();
      this.updateCounter();
      this.showToast('Added to wishlist');
    }
  }

  remove(productId) {
    this.items = this.items.filter((id) => id !== productId);
    Storage.saveWishlist(this.items);
    this.render();
    this.updateCounter();
    this.showToast('Removed from wishlist');
  }

  toggle(productId) {
    if (this.items.includes(productId)) {
      this.remove(productId);
    } else {
      this.add(productId);
    }
  }

  isInWishlist(productId) {
    return this.items.includes(productId);
  }

  render() {
    const wishlistProducts = document.getElementById('wishlistProducts');
    this.updateCounter();
    if (!wishlistProducts) return;
    const products = this.items.map((id) => ProductService.getById(id)).filter(Boolean);
    if (!products.length) {
      wishlistProducts.innerHTML = '<div class="empty-state">Your wishlist is empty. Add some favorites.</div>';
      return;
    }
    wishlistProducts.innerHTML = products.map((product) => `
      <article class="product-card">
        <img class="product-image" src="${product.image}" alt="${product.name}" />
        <div class="product-meta"><span class="tag">${product.category}</span><span>${product.stock}</span></div>
        <h3>${product.name}</h3>
        <div class="price-row"><span class="price">$${product.price}</span><span class="old-price">$${Math.round(product.price * 1.2)}</span></div>
        <div class="actions">
          <button class="btn btn-primary" data-action="add-cart" data-id="${product.id}">Add to cart</button>
          <button class="btn btn-secondary" data-action="remove-wishlist" data-id="${product.id}">Remove</button>
        </div>
      </article>
    `).join('');
  }

  showToast(message) {
    if (window.showToast) window.showToast(message);
  }

  updateCounter() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) wishlistCount.textContent = this.items.length;
  }
}

const wishlistManager = new WishlistManager();
window.wishlistManager = wishlistManager;

wishlistManager.updateCounter();

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.getAttribute('data-action');
  const id = Number(button.getAttribute('data-id'));
  if (action === 'remove-wishlist') {
    wishlistManager.remove(id);
  }
});
