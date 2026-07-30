const STORAGE_KEYS = {
  users: 'tmart-users',
  currentUser: 'tmart-current-user',
  cart: 'tmart-cart',
  wishlist: 'tmart-wishlist',
  orders: 'tmart-orders',
  addresses: 'tmart-addresses',
  theme: 'tmart-theme',
  recentlyViewed: 'tmart-recently-viewed'
};

const Storage = {
  get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  getUsers() {
    return this.get(STORAGE_KEYS.users) || [];
  },
  saveUsers(users) {
    this.set(STORAGE_KEYS.users, users);
  },
  getCurrentUser() {
    return this.get(STORAGE_KEYS.currentUser);
  },
  setCurrentUser(user) {
    this.set(STORAGE_KEYS.currentUser, user);
  },
  clearCurrentUser() {
    this.remove(STORAGE_KEYS.currentUser);
  },
  getCart() {
    return this.get(STORAGE_KEYS.cart) || [];
  },
  saveCart(cart) {
    this.set(STORAGE_KEYS.cart, cart);
  },
  getWishlist() {
    return this.get(STORAGE_KEYS.wishlist) || [];
  },
  saveWishlist(list) {
    this.set(STORAGE_KEYS.wishlist, list);
  },
  getOrders() {
    return this.get(STORAGE_KEYS.orders) || [];
  },
  saveOrders(orders) {
    this.set(STORAGE_KEYS.orders, orders);
  },
  getAddresses() {
    return this.get(STORAGE_KEYS.addresses) || [];
  },
  saveAddresses(addresses) {
    this.set(STORAGE_KEYS.addresses, addresses);
  },
  getTheme() {
    return this.get(STORAGE_KEYS.theme) || 'light';
  },
  saveTheme(theme) {
    this.set(STORAGE_KEYS.theme, theme);
  },
  getRecentlyViewed() {
    return this.get(STORAGE_KEYS.recentlyViewed) || [];
  },
  saveRecentlyViewed(ids) {
    this.set(STORAGE_KEYS.recentlyViewed, ids);
  }
};
