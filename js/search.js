class SearchManager {
  constructor() {
    this.inputs = document.querySelectorAll('#globalSearch');
    this.suggestions = document.getElementById('searchSuggestions');
    this.init();
  }

  init() {
    this.inputs.forEach((input) => {
      input.addEventListener('input', (event) => {
        const query = event.target.value.trim();
        this.renderSuggestions(query);
      });
      input.addEventListener('focus', () => this.renderSuggestions(input.value.trim()));
      input.addEventListener('blur', () => setTimeout(() => this.hideSuggestions(), 150));
    });
  }

  renderSuggestions(query) {
    if (!this.suggestions) return;
    if (!query) {
      this.suggestions.innerHTML = '';
      this.suggestions.classList.remove('active');
      return;
    }
    const results = ProductService.filterProducts({ query }).slice(0, 5);
    this.suggestions.innerHTML = results.length ? results.map((product) => `<div class="search-suggestion" data-id="${product.id}">${product.name}</div>`).join('') : '<div class="search-suggestion">No matches found</div>';
    this.suggestions.classList.add('active');
    this.suggestions.querySelectorAll('.search-suggestion[data-id]').forEach((item) => {
      item.addEventListener('click', () => {
        window.location.href = `product.html?id=${item.getAttribute('data-id')}`;
      });
    });
  }

  hideSuggestions() {
    if (this.suggestions) {
      this.suggestions.classList.remove('active');
    }
  }
}

new SearchManager();
