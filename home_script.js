const swiper = new Swiper('.swiper', {
  slidesPerView: 3, // Show 3 cards at a time
  spaceBetween: 20, // Spacing between cards
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  loop: true, // Enable infinite looping
});