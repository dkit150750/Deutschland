/* eslint-disable max-classes-per-file */
{
	class Menu {
		menuItemButtons = [];

		menu = false;

		isOpenSubmenu = false;

		openMenuItem = null;

		currentMenuItemButton = null;

		constructor(select) {
			this.menu = document.querySelector(select);
		}

		run() {
			this.menuItemButtons = [...this.menu.querySelectorAll('.menu__item-button')];
			this.itemButtonsAddHandler();
		}

		itemButtonsAddHandler() {
			this.menuItemButtons.forEach((menuItemButton) => {
				menuItemButton.addEventListener('click', () => {
					if (this.currentMenuItemButton === menuItemButton) {
						this.closeSubmenu();
						return;
					}

					if (this.currentMenuItemButton) {
						this.closeSubmenu();
					}
					this.currentMenuItemButton = menuItemButton;
					this.openSubmenuHandler();
				});
			});
		}

		openSubmenuHandler() {
			this.openMenuItem = null;
			this.openMenuItem = this.currentMenuItemButton.closest('.menu__item');

			this.openMenuItem.classList.add('menu__item--open');
			const submenu = this.openMenuItem.querySelector('.menu__list--sumbenu');
			const submenuLink = submenu.querySelector('.menu__link');

			this.currentMenuItemButton.setAttribute('aria-expanded', true);
			this.currentMenuItemButton.setAttribute('aria-label', 'Untermenü schließen');

			submenu.addEventListener(
				'transitionend',
				() => {
					document.addEventListener('click', this.documentClickHandler);
					document.addEventListener('keyup', this.documentEscapeHandler);
					submenuLink.focus();
				},
				{ once: true },
			);
		}

		documentClickHandler = (event) => {
			const { target } = event;

			// if (target === this.currentMenuItemButton) {
			// 	document.removeEventListener('click', this.documentClickHandler);
			// }

			if (!target.classList.contains('menu__list--sumbenu') && !target.closest('.menu__list--sumbenu')) {
				this.closeSubmenu();
			}
		};

		documentEscapeHandler = (event) => {
			if (event.key === 'Escape') {
				this.closeSubmenu();
			}
		};

		closeSubmenu() {
			document.removeEventListener('click', this.documentClickHandler);
			document.removeEventListener('keyup', this.documentEscapeHandler);
			this.isOpenSubmenu = false;
			this.currentMenuItemButton.setAttribute('aria-expanded', false);
			this.currentMenuItemButton.setAttribute('aria-label', 'Untermenü öffnen');
			this.currentMenuItemButton.focus();
			this.openMenuItem.classList.remove('menu__item--open');
			this.openMenuItem = null;
			this.currentMenuItemButton = null;
		}
	}

	const submenu = new Menu('.menu');
	submenu.run();
}

{
	class MobileMenu {
		menuItemButtons = [];

		menuItemButtonsClose = [];

		menu = null;

		burger = null;

		isOpenMenu = false;

		constructor(selectMenu, selectBurger) {
			this.menu = document.querySelector(selectMenu);
			this.burger = document.querySelector(selectBurger);
		}

		run() {
			this.menuItemButtons = [...this.menu.querySelectorAll('.mobile-menu__item-button')];
			this.menuItemButtonsClose = [...this.menu.querySelectorAll('.mobile-menu__header-button')];
			this.menuButtonClose = this.menu.querySelector('.mobile-menu__header-button');
			this.body = document.querySelector('.page__body');

			this.addHandler();
		}

		addHandler() {
			this.menuButtonClose.addEventListener('click', () => {
				this.closeMenuHandler();
			});

			this.burger.addEventListener('click', () => {
				if (!this.isOpenMenu) {
					this.openMenuHandler();
				} else {
					this.closeMenuHandler();
				}
			});

			this.menuItemButtons.forEach((menuItemButton) => {
				menuItemButton.addEventListener('click', () => {
					this.openSubMenuHandler(menuItemButton);
				});
			});

			this.menuItemButtonsClose.forEach((menuItemButtonClose) => {
				menuItemButtonClose.addEventListener('click', () => {
					this.closeSubMenuHandler(menuItemButtonClose);
				});
			});
		}

		openMenuHandler() {
			this.burger.setAttribute('aria-expanded', true);
			this.burger.setAttribute('aria-label', 'Menü schließen');

			this.menuButtonClose.focus();

			this.menu.classList.add('mobile-menu__list-wrapper--open');
			this.body.classList.add('page__body--lock');
		}

		closeMenuHandler() {
			this.burger.setAttribute('aria-expanded', false);
			this.burger.setAttribute('aria-label', 'Menü öffnen');

			this.burger.focus();

			this.menu.classList.remove('mobile-menu__list-wrapper--open');
			this.body.classList.remove('page__body--lock');
		}

		openSubMenuHandler(menuItemButton) {
			menuItemButton
				.closest('.mobile-menu__item')
				.querySelector('.mobile-menu__list--sumbenu')
				.classList.add('mobile-menu__list--sumbenu-open');
			this.menu.classList.add('mobile-menu__list-wrapper--lock');
			this.menu.scrollTop = 0;
		}

		closeSubMenuHandler(menuItemButtonClose) {
			menuItemButtonClose.closest('.mobile-menu__list--sumbenu').classList.remove('mobile-menu__list--sumbenu-open');
			this.menu.classList.remove('mobile-menu__list-wrapper--lock');
		}
	}

	const mobileMenu = new MobileMenu('.mobile-menu__list-wrapper', '.mobile-menu__button');
	mobileMenu.run();
	// const body = document.querySelector('.page__body');
	// const mobileMenuButton = document.querySelector('.mobile-menu__button');
	// const mobileMenuButtonClose = document.querySelector('.mobile-menu__header-button');
	// const mobileMenuItemButtons = document.querySelectorAll('.mobile-menu__item-button');
	// const mobileMenuItemButtonsClose = document.querySelectorAll('.mobile-menu__item .mobile-menu__header-button');
	// const mobileMenu = document.querySelector('.mobile-menu__list-wrapper');

	// const mobileMenuHandler = () => {
	// 	const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
	// 	mobileMenuButton.setAttribute('aria-expanded', !expanded);
	// 	if (expanded) {
	// 		mobileMenuButton.setAttribute('aria-label', 'Menü öffnen');

	// 		mobileMenuButtonClose.focus();
	// 	} else {
	// 		mobileMenuButton.setAttribute('aria-label', 'Menü schließen');
	// 		mobileMenuButton.focus();
	// 	}
	// 	mobileMenuButton.classList.toggle('mobile-menu__button--open');
	// 	mobileMenu.classList.toggle('mobile-menu__list-wrapper--open');
	// 	body.classList.toggle('page__body--lock');
	// };

	// mobileMenuButton.addEventListener('click', mobileMenuHandler);

	// mobileMenuButtonClose.addEventListener('click', mobileMenuHandler);

	// mobileMenuItemButtons.forEach((mobileMenuItemButton) => {
	// 	mobileMenuItemButton.addEventListener('click', () => {
	// 		mobileMenuItemButton
	// 			.closest('.mobile-menu__item')
	// 			.querySelector('.mobile-menu__list--sumbenu')
	// 			.classList.add('mobile-menu__list--sumbenu-open');
	// 		mobileMenu.scrollTop = 0;
	// 	});
	// });

	// mobileMenuItemButtonsClose.forEach((mobileMenuItemButtonClose) => {
	// 	mobileMenuItemButtonClose.addEventListener('click', () => {
	// 		mobileMenuItemButtonClose
	// 			.closest('.mobile-menu__list--sumbenu')
	// 			.classList.remove('mobile-menu__list--sumbenu-open');
	// 		mobileMenu.classList.remove('mobile-menu__list-wrapper--lock');
	// 	});
	// });
}
