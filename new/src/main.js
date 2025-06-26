/* Styles */
import './scss/styles.scss';
import './scss/fontawesome.scss';

/* Header */
let isExpanded = false;
const headerNav = document.querySelector('.header__nav');
const menuButton = document.querySelector('#header__menu-btn');

menuButton.addEventListener('click', () => {
    isExpanded = !isExpanded;
    headerNav.setAttribute('aria-expanded', isExpanded);
    menuButton.setAttribute('aria-expanded', isExpanded);
});

/* Code Editor */
import CodeEditor from './js/codeEditor/CodeEditor.js';

const thisEditor = new CodeEditor('intro');

thisEditor.init();

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