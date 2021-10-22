/* eslint-disable no-undef */
{
	const homeSwiper = new Swiper('.home-swiper', {
		init: false,
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
			el: '.home-swiper-pagination',
			clickable: true,
			bulletClass: 'home-swiper-pagination-bullet',
			bulletActiveClass: 'home-swiper-pagination-bullet-active',
		},

		breakpoints: {
			640: {
				navigation: {
					nextEl: '.home-swiper__button-next',
					prevEl: '.home-swiper__button-prev',
				},
			},
		},
	});

	homeSwiper.init();
}
