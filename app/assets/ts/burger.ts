function headerMenu() {
	const target = document.querySelector(`.nav`);
	const trigger = document.querySelector(`#header__burger`);
	console.log(target, trigger);

	target!.addEventListener('click', (event) => {
		const menu = event?.target as HTMLElement;
		const menuTrigger = trigger as HTMLInputElement
		if (menu.className.includes('nav__item')) menuTrigger.checked = false
	})
}

headerMenu()