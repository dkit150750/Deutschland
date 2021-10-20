const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows

  breakpoints: {
    640: {
      navigation: {
        nextEl: '.swiper__button-next',
        prevEl: '.swiper__button-prev',
      },
    },
  }
});