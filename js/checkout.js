class CheckoutManager {
  constructor() {
    this.summary = document.getElementById('checkoutSummary');
    this.form = document.getElementById('checkoutForm');
    this.init();
  }

  init() {
    this.renderSummary();
    if (this.form) {
      this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!this.validate()) return;
        const address = {
          receiverName: document.getElementById('receiverName').value,
          mobile: document.getElementById('mobile').value,
          email: document.getElementById('email').value,
          house: document.getElementById('house').value,
          street: document.getElementById('street').value,
          area: document.getElementById('area').value,
          landmark: document.getElementById('landmark').value,
          city: document.getElementById('city').value,
          district: document.getElementById('district').value,
          state: document.getElementById('state').value,
          country: document.getElementById('country').value,
          pincode: document.getElementById('pincode').value,
          addressType: document.getElementById('addressType').value,
          instructions: document.getElementById('instructions').value
        };
        const addresses = Storage.getAddresses();
        if (document.getElementById('saveAddress').checked) addresses.push(address);
        Storage.saveAddresses(addresses);
        window.location.href = 'payment.html';
      });
    }
  }

  validate() {
    const requiredFields = ['receiverName', 'mobile', 'email', 'house', 'street', 'area', 'city', 'district', 'state', 'country', 'pincode'];
    let valid = true;
    requiredFields.forEach((field) => {
      const input = document.getElementById(field);
      if (!input.value.trim()) {
        valid = false;
        this.showToast(`${field} is required`);
      }
    });
    const email = document.getElementById('email').value;
    if (email && !window.ValidationService?.isEmail(email)) {
      valid = false;
      this.showToast('Enter a valid email');
    }
    return valid;
  }

  renderSummary() {
    if (!this.summary) return;
    const subtotal = cartManager.getSubtotal().toFixed(2);
    this.summary.innerHTML = `
      <h3>Checkout summary</h3>
      <div class="summary-row"><span>Subtotal</span><span>$${subtotal}</span></div>
      <div class="summary-row"><span>Shipping</span><span>$${cartManager.getShipping().toFixed(2)}</span></div>
      <div class="summary-row total"><span>Total</span><span>$${cartManager.getGrandTotal().toFixed(2)}</span></div>
    `;
  }

  showToast(message) {
    if (window.showToast) window.showToast(message);
  }
}

new CheckoutManager();
