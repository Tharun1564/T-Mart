const ValidationService = {
  isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  },
  isPasswordStrong(value) {
    return value.length >= 8;
  },
  isPhone(value) {
    return /^\+?[0-9\s-]{7,15}$/.test(value);
  }
};

window.ValidationService = ValidationService;
