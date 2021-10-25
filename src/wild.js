/* eslint-disable no-undef */
{
	const swiperWrapper = document.querySelector('.wild-swiper .swiper-wrapper');
	const slides = [...swiperWrapper.querySelectorAll('.swiper-slide')];

	function createColumns() {
		const column1 = document.createElement('div');
		const column2 = document.createElement('div');
		column1.classList.add('wild-swiper__images-column');
		column2.classList.add('wild-swiper__images-column');
		column1.append(...slides.slice(0, 4));
		column2.append(...slides.slice(4));
		swiperWrapper.append(column1);
		swiperWrapper.append(column2);
	}

	function removeColumns(columns) {
		columns.forEach((column) => {
			column.remove();
		});
		swiperWrapper.append(...slides);
	}

	const breakpoint = window.matchMedia('(min-width: 1140px)');
	let wildSwiper;

	const enableSwiper = () => {
		wildSwiper = new Swiper('.wild-swiper', {
			init: false,
			slidesPerView: 'auto',
			spaceBetween: 20,
		});

		wildSwiper.init();
	};

	const breakpointChecker = () => {
		if (breakpoint.matches) {
			if (wildSwiper !== undefined) {
				wildSwiper.destroy(true, true);
			}
			createColumns();

			return;
		}

		const columns = [...swiperWrapper.querySelectorAll('.wild-swiper__images-column')];
		if (columns.length > 0) {
			removeColumns(columns);
		}

		enableSwiper();
	};

	breakpoint.addEventListener('change', breakpointChecker);

	breakpointChecker();
}
