"use strict"
import Swiper, { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import "../scss/style.scss"

// Меню
const mobileMenuIcon = document.querySelector('.header__menu-button')
const mobileMenu = document.querySelector('.menu__list')
const openMenu = document.getElementById('openMenu')
const closeMenu = document.getElementById('closeMenu')
// Модальное окно
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal__content')
const modalButton = document.querySelectorAll('.button')
const modalCloseButton = document.querySelector('.modal__close-button')
const windowElement = document.querySelector('html')


// --------------------------------------Мобильное меню----------------------------------------------------------------------
mobileMenuIcon.addEventListener('click', () => {
	mobileMenu.classList.toggle('active')
	windowElement.classList.toggle('no-scroll')
	showHide(openMenu, closeMenu)
})

function closeMenuFunction(event) {
	if (mobileMenu.classList.contains('active') && windowElement.classList.contains('no-scroll')) {
		mobileMenu.classList.remove('active')
		windowElement.classList.remove('no-scroll')
	} else {
		mobileMenu.classList.add('active')
		windowElement.classList.add('no-scroll')
	}
	showHide(openMenu, closeMenu)
	event.stopPropagation()
}

mobileMenu.addEventListener('click', closeMenuFunction)

function showHide(openMenu, closeMenu) {
	if (openMenu && closeMenu) {
		if (openMenu.style.display != "inline" && closeMenu.style.display === "inline") {
			openMenu.style.display = "inline"
			closeMenu.style.display = "none"
		}
		else {
			openMenu.style.display = "none"
			closeMenu.style.display = "inline"
		}
	}
}

//----------------------------------SWIPER-------------------------------------------------------------------
const mySwiper = new Swiper('.swiper', {
	modules: [Navigation, Pagination],
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		type: 'fraction',
		renderFraction: function (currentClass, totalClass) {
			return '<span id="pagin" class=" ' + currentClass + ' "></span>' + '/' + '<span class="' + totalClass + '"></span>'
		}
	},
	simulateTouch: false,
	speed: 800,
	loop: true
})

// --------------------------------PopUp----------------------------------------------------------------
function openModal() {
	if (!modal.classList.contains('active')) {
		modal.classList.add('active')
		modalContent.classList.add('active')
		windowElement.classList.add('no-scroll')
	}
}
function closeModal() {
	if (modal.classList.contains('active')) {
		modal.classList.remove('active')
		modalContent.classList.remove('active')
		if (mobileMenu.classList.contains('active') === false) {
			windowElement.classList.remove('no-scroll')
		}
	}

}
modal.addEventListener('click', closeModal)

modalButton.forEach(button => {
	button.addEventListener('click', openModal)
});

modalCloseButton.addEventListener('click', closeModal)

// --------------------------------Валидация формы---------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {

	const form = document.getElementById('form');

	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();
		let error = formValidate(form);
		if (error === 0) {
			form.reset()
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];

			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (input.value === "") {
					formAddError(input, "Обязательное поле");
				}
				else if (emailTest(input)) {
					formAddError(input, "Некоректный e-mail");
					error++;
				}
			}
			else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			}
			else {
				if (input.value === '') {
					formAddError(input, "Обязательное поле");
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input, text) {
		formRemoveError(input)
		let parrentEl = input.parentNode
		parrentEl.classList.add('_error')
		const errLable = document.createElement('lable')
		errLable.classList.add('error-lable')
		errLable.textContent = text
		parrentEl.append(errLable)
	}

	function formRemoveError(input) {

		const parent = input.parentNode
		if (parent.classList.contains('_error')) {
			parent.querySelector('.error-lable').remove()
			parent.classList.remove('_error')
		}
	}
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
})