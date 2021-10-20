{
	const body = document.querySelector('.page__body');
	const mobileMenuButton = document.querySelector('.mobile-menu__button');
	const mobileMenuButtonClose = document.querySelector('.mobile-menu__header-button');
	const mobileMenuItemButtons = document.querySelectorAll('.mobile-menu__item-button');
	const mobileMenuItemButtonsClose = document.querySelectorAll(
		'.mobile-menu__item .mobile-menu__header-button'
	);
	const mobileMenu = document.querySelector('.mobile-menu__list-wrapper');

	const mobileMenuHandler = () => {
		let expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
		mobileMenuButton.setAttribute('aria-expanded', !expanded);
		expanded
			? mobileMenuButton.setAttribute('aria-label', 'Menü öffnen')
			: mobileMenuButton.setAttribute('aria-label', 'Menü schließen');
		mobileMenuButton.classList.toggle('mobile-menu__button--open');
		mobileMenu.classList.toggle('mobile-menu__list-wrapper--open');
		body.classList.toggle('page__body--lock');

		if (mobileMenu.classList.contains('mobile-menu__list-wrapper--open')) {
			mobileMenuButtonClose.focus();
		} else {
			mobileMenuButton.focus();
		}
	};

	mobileMenuButton.addEventListener('click', mobileMenuHandler);

	mobileMenuButtonClose.addEventListener('click', mobileMenuHandler);

	mobileMenuItemButtons.forEach((mobileMenuItemButton) => {
		mobileMenuItemButton.addEventListener('click', () => {
			mobileMenuItemButton
				.closest('.mobile-menu__item')
				.querySelector('.mobile-menu__list--sumbenu')
				.classList.add('mobile-menu__list--sumbenu-open');
			mobileMenu.scrollTop = 0;
			// mobileMenu.classList.add('mobile-menu__list-wrapper--lock');
			// submenu.addEventListener('transitionend', () => {}, { once: true });
		});
	});

	mobileMenuItemButtonsClose.forEach((mobileMenuItemButtonClose) => {
		mobileMenuItemButtonClose.addEventListener('click', () => {
			mobileMenuItemButtonClose
				.closest('.mobile-menu__list--sumbenu')
				.classList.remove('mobile-menu__list--sumbenu-open');
			mobileMenu.classList.remove('mobile-menu__list-wrapper--lock');
		});
	});
}

{
	const menuItemButtons = document.querySelectorAll('.menu__link--button');
	const menuItemOverlays = document.querySelectorAll('.menu__item-overlay');
	menuItemButtons.forEach((menuItemButton) => {
		menuItemButton.addEventListener('click', () => {
			menuItemButton.classList.toggle('menu__link--open');
			const parent = menuItemButton.closest('.menu__item');
			parent.querySelector('.menu__list--sumbenu').classList.toggle('menu__list--sumbenu-open');
			parent.querySelector('.menu__item-overlay').classList.toggle('menu__item-overlay--open');
			mobileMenu.classList.add('mobile-menu__list-wrapper--lock');
		});
	});
	menuItemOverlays.forEach((menuItemOverlay) => {
		menuItemOverlay.addEventListener('click', () => {
			menuItemOverlay.classList.remove('menu__item-overlay--open');
			const parent = menuItemOverlay.closest('.menu__item');
			parent.querySelector('.menu__link--button').classList.remove('menu__link--open');
			parent.querySelector('.menu__list--sumbenu').classList.remove('menu__list--sumbenu-open');
		});
	});
}
