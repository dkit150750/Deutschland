/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const swiper = new Swiper('.swiper', {
	loop: true,
	autoplay: {
		delay: 5000,
	},
	clickable: true,

	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	breakpoints: {
		640: {
			navigation: {
				nextEl: '.swiper__button-next',
				prevEl: '.swiper__button-prev',
			},
		},
	},
});
