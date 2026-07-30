class AuthManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindSignUp();
    this.bindSignIn();
    this.bindPasswordToggles();
    this.bindLogout();
    this.renderProfile();
  }

  bindSignUp() {
    const form = document.getElementById('signupForm');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const mobile = document.getElementById('signupMobile').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirm = document.getElementById('confirmPassword').value;
      const error = document.getElementById('signupError');
      if (!name || !email || !mobile || !password || !confirm) {
        error.textContent = 'All fields are required';
        return;
      }
      if (!window.ValidationService.isEmail(email)) {
        error.textContent = 'Enter a valid email';
        return;
      }
      if (!window.ValidationService.isPasswordStrong(password)) {
        error.textContent = 'Password must be at least 8 characters';
        return;
      }
      if (password !== confirm) {
        error.textContent = 'Passwords do not match';
        return;
      }
      const users = Storage.getUsers();
      if (users.some((u) => u.email === email)) {
        error.textContent = 'User already exists';
        return;
      }
      users.push({ name, email, mobile, password });
      Storage.saveUsers(users);
      Storage.setCurrentUser({ name, email, mobile });
      window.location.href = 'index.html';
    });
  }

  bindSignIn() {
    const form = document.getElementById('signinForm');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('signinEmail').value.trim();
      const password = document.getElementById('signinPassword').value;
      const error = document.getElementById('signinError');
      const users = Storage.getUsers();
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        error.textContent = 'Invalid credentials';
        return;
      }
      Storage.setCurrentUser(user);
      window.location.href = 'index.html';
    });
  }

  bindPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach((button) => {
      button.addEventListener('click', () => {
        const target = document.getElementById(button.getAttribute('data-target'));
        if (!target) return;
        target.type = target.type === 'password' ? 'text' : 'password';
        button.textContent = target.type === 'password' ? 'Show' : 'Hide';
      });
    });
  }

  bindLogout() {
    const button = document.getElementById('logoutBtn');
    if (!button) return;
    button.addEventListener('click', () => {
      Storage.clearCurrentUser();
      window.location.href = 'signin.html';
    });
  }

  renderProfile() {
    const currentUser = Storage.getCurrentUser();
    const authLink = document.getElementById('authLink');
    if (authLink) {
      authLink.href = currentUser ? 'profile.html' : 'signin.html';
    }
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editMobile = document.getElementById('editMobile');
    const savedAddresses = document.getElementById('savedAddresses');
    const myOrders = document.getElementById('myOrders');
    const saveProfile = document.getElementById('saveProfile');
    if (!currentUser) return;
    if (profileName) profileName.textContent = currentUser.name;
    if (profileEmail) profileEmail.textContent = currentUser.email;
    if (editName) editName.value = currentUser.name;
    if (editEmail) editEmail.value = currentUser.email;
    if (editMobile) editMobile.value = currentUser.mobile;
    if (savedAddresses) {
      const addresses = Storage.getAddresses();
      savedAddresses.innerHTML = addresses.length ? addresses.map((address) => `<p>${address.house}, ${address.street}, ${address.city}</p>`).join('') : '<p>No addresses saved yet.</p>';
    }
    if (myOrders) {
      const orders = Storage.getOrders();
      myOrders.innerHTML = orders.length ? orders.map((order) => `<p>${order.id} — $${order.amount.toFixed(2)}</p>`).join('') : '<p>No orders yet.</p>';
    }
    if (saveProfile) {
      saveProfile.addEventListener('click', () => {
        const users = Storage.getUsers();
        const updated = users.map((user) => (user.email === currentUser.email ? { ...user, name: editName.value, email: editEmail.value, mobile: editMobile.value } : user));
        Storage.saveUsers(updated);
        Storage.setCurrentUser({ ...currentUser, name: editName.value, email: editEmail.value, mobile: editMobile.value });
        window.showToast?.('Profile updated');
      });
    }
  }
}

new AuthManager();
window.AuthManager = AuthManager;
