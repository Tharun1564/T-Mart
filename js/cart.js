class CartManager {
  constructor() {
    this.items = Storage.getCart();
  }

  getItems() {
    return this.items;
  }

  add(productId, quantity = 1) {
    const existingItem = this.items.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ id: productId, quantity });
    }
    Storage.saveCart(this.items);
    this.render();
    this.showToast('Added to cart');
  }

  remove(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    Storage.saveCart(this.items);
    this.render();
    this.showToast('Removed from cart');
  }

  update(productId, quantity) {
    this.items = this.items.map((item) => (item.id === productId ? { ...item, quantity } : item)).filter((item) => item.quantity > 0);
    Storage.saveCart(this.items);
    this.render();
  }

  getTotal() {
    return this.items.reduce((sum, item) => {
      const product = ProductService.getById(item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  getDiscount() {
    return this.items.reduce((sum, item) => {
      const product = ProductService.getById(item.id);
      return sum + (product ? (product.price * item.quantity * product.discount) / 100 : 0);
    }, 0);
  }

  getSubtotal() {
    return this.getTotal() + this.getDiscount();
  }

  getGst() {
    return this.getSubtotal() * 0.18;
  }

  getShipping() {
    return this.getSubtotal() > 200 ? 0 : 25;
  }

  getGrandTotal() {
    return this.getSubtotal() + this.getGst() + this.getShipping();
  }

  render() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    if (!cartItems && !cartSummary) {
      this.updateCounters();
      return;
    }
    const products = this.items.map((item) => ({ ...ProductService.getById(item.id), quantity: item.quantity })).filter(Boolean);
    if (cartItems) {
      if (!products.length) {
        cartItems.innerHTML = '<div class="empty-state">Your cart is empty. Add a few premium pieces.</div>';
      } else {
        cartItems.innerHTML = products.map((product) => `
          <article class="cart-item">
            <img src="${product.image}" alt="${product.name}" />
            <div>
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <div class="price-row"><span class="price">$${product.price}</span><span class="old-price">$${Math.round(product.price * 1.2)}</span></div>
              <div class="qty-controls">
                <button data-action="decrease" data-id="${product.id}">-</button>
                <span>${product.quantity}</span>
                <button data-action="increase" data-id="${product.id}">+</button>
              </div>
            </div>
            <div>
              <strong>$${(product.price * product.quantity).toFixed(2)}</strong>
              <div class="actions"><button class="btn btn-secondary" data-action="remove" data-id="${product.id}">Remove</button></div>
            </div>
          </article>
        `).join('');
      }
    }
    if (cartSummary) {
      cartSummary.innerHTML = `
        <h3>Order summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>$${this.getSubtotal().toFixed(2)}</span></div>
        <div class="summary-row"><span>Discount</span><span>-$${this.getDiscount().toFixed(2)}</span></div>
        <div class="summary-row"><span>GST</span><span>$${this.getGst().toFixed(2)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>$${this.getShipping().toFixed(2)}</span></div>
        <div class="summary-row total"><span>Grand total</span><span>$${this.getGrandTotal().toFixed(2)}</span></div>
        <div class="coupon-box">
          <input id="couponInput" placeholder="Coupon code" />
          <button class="btn btn-secondary" id="applyCoupon">Apply</button>
        </div>
        <a class="btn btn-primary w-full" href="checkout.html">Proceed to checkout</a>
      `;
    }
    this.updateCounters();
  }

  updateCounters() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  showToast(message) {
    if (window.showToast) window.showToast(message);
  }
}

const cartManager = new CartManager();

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.getAttribute('data-action');
  const id = Number(button.getAttribute('data-id'));
  if (action === 'increase') cartManager.add(id);
  if (action === 'decrease') cartManager.update(id, Math.max(0, (cartManager.getItems().find((item) => item.id === id)?.quantity || 0) - 1));
  if (action === 'remove') cartManager.remove(id);
});

window.cartManager = cartManager;
