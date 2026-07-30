class SliderManager {
  constructor() {
    this.slider = document.getElementById('heroSlider');
    this.init();
  }

  init() {
    if (!this.slider) return;
    const slides = Array.from(this.slider.querySelectorAll('.slide'));
    let index = 0;
    setInterval(() => {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      this.slider.style.background = slides[index].dataset.bg;
      slides[index].classList.add('active');
    }, 5000);
  }
}

new SliderManager();
