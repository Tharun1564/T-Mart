class PaymentManager {
  constructor() {
    this.options = document.getElementById('paymentOptions');
    this.form = document.getElementById('paymentForm');
    this.summary = document.getElementById('paymentSummary');
    this.selectedMethod = 'card';
    this.init();
  }

  init() {
    this.renderSummary();
    if (this.options) {
      this.options.innerHTML = `
        <button class="payment-option active" type="button" data-method="card">Credit Card</button>
        <button class="payment-option" type="button" data-method="upi">UPI</button>
        <button class="payment-option" type="button" data-method="gpay">Google Pay</button>
        <button class="payment-option" type="button" data-method="cod">Cash on Delivery</button>
      `;
      this.options.addEventListener('click', (event) => {
        const button = event.target.closest('[data-method]');
        if (!button) return;
        this.selectedMethod = button.getAttribute('data-method');
        document.querySelectorAll('.payment-option').forEach((opt) => opt.classList.toggle('active', opt === button));
        this.form.style.display = this.selectedMethod === 'card' ? 'grid' : 'none';
      });
    }

    if (this.form) {
      this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!this.validateCard()) return;
        const orderId = `TM-${Math.floor(100000 + Math.random() * 900000)}`;
        const invoiceNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
        const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString();
        const orders = Storage.getOrders();
        orders.push({ id: orderId, invoice: invoiceNumber, date: deliveryDate, amount: cartManager.getGrandTotal() });
        Storage.saveOrders(orders);
        Storage.saveCart([]);
        const success = document.getElementById('orderSummary');
        if (success) {
          success.innerText = `${orderId} • ${invoiceNumber} • Delivery by ${deliveryDate}`;
        }
        window.location.href = 'order-success.html';
      });
    }
  }

  validateCard() {
    const cardNumber = document.getElementById('cardNumber')?.value || '';
    const exp = document.getElementById('expiry')?.value || '';
    const cvv = document.getElementById('cvv')?.value || '';
    if (!cardNumber || cardNumber.replace(/\D/g, '').length < 16) {
      this.showToast('Enter a valid card number');
      return false;
    }
    if (!exp || !/\d{2}\/\d{2}/.test(exp)) {
      this.showToast('Enter a valid expiry date');
      return false;
    }
    if (!cvv || cvv.length < 3) {
      this.showToast('Enter a valid CVV');
      return false;
    }
    return true;
  }

  renderSummary() {
    if (!this.summary) return;
    this.summary.innerHTML = `
      <h3>Payment summary</h3>
      <div class="summary-row"><span>Total</span><span>$${cartManager.getGrandTotal().toFixed(2)}</span></div>
      <div class="summary-row"><span>Method</span><span>${this.selectedMethod}</span></div>
    `;
  }

  showToast(message) {
    if (window.showToast) window.showToast(message);
  }
}

if (document.getElementById('paymentOptions') || document.getElementById('orderSummary')) {
  new PaymentManager();
}

window.downloadInvoice = function () {
  const invoice = document.getElementById('orderSummary')?.innerText || 'Invoice';
  const blob = new Blob([invoice], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'invoice.txt';
  link.click();
};

document.addEventListener('click', (event) => {
  if (event.target.id === 'downloadInvoice') {
    window.downloadInvoice();
  }
});
