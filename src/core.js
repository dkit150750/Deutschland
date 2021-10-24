/* eslint-disable max-classes-per-file */
{
	class Menu {
		constructor(select) {
			this.$menu = document.querySelector(select);
		}

		run = () => {
			this.$menuItemButtons = [...this.$menu.querySelectorAll('.menu__item-button')];
			this.itemButtonsAddHandler();
		};

		itemButtonsAddHandler = () => {
			this.$menuItemButtons.forEach(($menuItemButton) => {
				$menuItemButton.addEventListener('click', () => {
					if (this.$openMenuItemButton === $menuItemButton) {
						this.closeSubmenu();
						return;
					}

					if (this.$openMenuItemButton) {
						this.closeSubmenu();
					}
					this.$openMenuItemButton = $menuItemButton;
					this.openSubmenuHandler();
				});
			});
		};

		openSubmenuHandler = () => {
			this.$openMenuItem = this.$openMenuItemButton.closest('.menu__item');

			this.$openMenuItem.classList.add('menu__item--open');
			this.$openSubmenu = this.$openMenuItem.querySelector('.menu__list--sumbenu');
			const $submenuLink = this.$openSubmenu.querySelector('.menu__link');

			this.$openMenuItemButton.setAttribute('aria-expanded', true);
			this.$openMenuItemButton.setAttribute('aria-label', 'Untermenü schließen');

			this.$openSubmenu.addEventListener(
				'transitionend',
				() => {
					document.addEventListener('click', this.documentClickHandler);
					document.addEventListener('keyup', this.documentEscapeHandler);
					$submenuLink.focus();
				},
				{ once: true },
			);
		};

		documentClickHandler = (event) => {
			const $target = event.target;

			// if (target === this.openMenuItemButton) {
			// 	document.removeEventListener('click', this.documentClickHandler);
			// }

			if ($target !== this.$openSubmenu && $target.closest('.menu__list--sumbenu') !== this.$openSubmenu) {
				this.closeSubmenu();
			}
		};

		documentEscapeHandler = (event) => {
			if (event.key === 'Escape') {
				this.closeSubmenu();
			}
		};

		closeSubmenu = () => {
			document.removeEventListener('click', this.documentClickHandler);
			document.removeEventListener('keyup', this.documentEscapeHandler);

			this.$openMenuItemButton.setAttribute('aria-expanded', false);
			this.$openMenuItemButton.setAttribute('aria-label', 'Untermenü öffnen');

			this.$openMenuItemButton.focus();

			this.$openMenuItem.classList.remove('menu__item--open');

			this.$openMenuItem = null;
			this.$openSubmenu = null;
			this.$openMenuItemButton = null;
		};
	}

	const submenu = new Menu('.menu');
	submenu.run();
}

{
	class MobileMenu {
		isOpenMenu = false;

		constructor(selectMenu, selectBurger) {
			this.$menu = document.querySelector(selectMenu);
			this.$burger = document.querySelector(selectBurger);
		}

		run = () => {
			this.$menuItemButtons = [...this.$menu.querySelectorAll('.mobile-menu__item-button')];
			this.$menuButtonClose = this.$menu.querySelector('.mobile-menu__header-button');
			this.$body = document.querySelector('.page__body');

			this.addHandler();
		};

		addHandler = () => {
			this.$menuButtonClose.addEventListener('click', () => {
				this.closeMenuHandler();
			});

			this.$burger.addEventListener('click', () => {
				if (!this.isOpenMenu) {
					this.openMenuHandler();
				} else {
					this.closeMenuHandler();
				}
			});

			this.$menuItemButtons.forEach(($menuItemButton) => {
				$menuItemButton.addEventListener('click', () => {
					this.$menuItemButton = $menuItemButton;
					this.openSubmenuHandler();
				});
			});
		};

		openMenuHandler = () => {
			this.isOpenMenu = true;
			this.$burger.setAttribute('aria-expanded', true);
			this.$burger.setAttribute('aria-label', 'Menü schließen');

			this.$menu.classList.add('mobile-menu__list-wrapper--visible');
			this.$menu.classList.add('mobile-menu__list-wrapper--open');
			this.$body.classList.add('page__body--lock');

			this.$menu.addEventListener(
				'transitionend',
				() => {
					this.$menuButtonClose.focus();
				},
				{ once: true },
			);
		};

		closeMenuHandler = () => {
			this.isOpenMenu = false;
			this.$burger.setAttribute('aria-expanded', false);
			this.$burger.setAttribute('aria-label', 'Menü öffnen');

			this.$burger.focus();

			this.$menu.classList.remove('mobile-menu__list-wrapper--open');
			this.$body.classList.remove('page__body--lock');

			this.$menu.addEventListener(
				'transitionend',
				() => {
					this.$menu.classList.remove('mobile-menu__list-wrapper--visible');
				},
				{ once: true },
			);
		};

		openSubmenuHandler = () => {
			const $openMenuItem = this.$menuItemButton.closest('.mobile-menu__item');
			this.$openSubmenu = $openMenuItem.querySelector('.mobile-menu__list--sumbenu');
			this.$openSubmenu.classList.add('mobile-menu__list--sumbenu-visible');
			this.$openSubmenu.classList.add('mobile-menu__list--sumbenu-open');
			this.$menu.classList.add('mobile-menu__list-wrapper--lock');
			this.$menu.scrollTop = 0;
			this.$submenuButtonClose = this.$openSubmenu.querySelector('.mobile-menu__header-button');
			this.$submenuButtonClose.addEventListener('click', this.closeSubmenuHandler);

			this.$openSubmenu.addEventListener(
				'transitionend',
				() => {
					this.$submenuButtonClose.focus();
				},
				{ once: true },
			);
		};

		closeSubmenuHandler = () => {
			this.$openSubmenu.classList.remove('mobile-menu__list--sumbenu-open');
			this.$menu.classList.remove('mobile-menu__list-wrapper--lock');
			this.$menuItemButton.focus();

			this.$submenuButtonClose.removeEventListener('click', this.closeSubmenuHandler);

			this.$openSubmenu.addEventListener(
				'transitionend',
				() => {
					this.$openSubmenu.classList.remove('mobile-menu__list--sumbenu-visible');
					this.$openSubmenu = null;
				},
				{ once: true },
			);

			this.$submenuButtonClose = null;
			this.$menuItemButton = null;
		};
	}

	const mobileMenu = new MobileMenu('.mobile-menu__list-wrapper', '.mobile-menu__button');
	mobileMenu.run();
}
