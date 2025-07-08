/* Styles */
import './scss/styles.scss';

/* Header */
let isExpanded = false;
const headerNav = document.querySelector('.header__nav');
const menuButton = document.querySelector('#header__menu-btn');

menuButton.addEventListener('click', () => {
    isExpanded = !isExpanded;
    headerNav.setAttribute('aria-expanded', isExpanded);
    menuButton.setAttribute('aria-expanded', isExpanded);
});

/* main */
window.addEventListener('scroll', () => {
    let scroll = document.documentElement.scrollTop;
    if (scroll >= 50) {
        document.querySelector(".header").classList.add("blur");
    } else {
        document.querySelector(".header").classList.remove("blur");
    }
})

/* Footer */
const footer__year = document.querySelector('.footer__year');
footer__year.textContent = new Date().getFullYear();