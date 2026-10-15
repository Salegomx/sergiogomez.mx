/* Header */
let isExpanded = false;
const headerNav = document.querySelector('.header__nav');
const menuButton = document.querySelector('#header__menu-btn');

menuButton.addEventListener('click', () => {
    isExpanded = !isExpanded;
    headerNav.setAttribute('aria-expanded', isExpanded);
    menuButton.setAttribute('aria-expanded', isExpanded);
});

/* Theme (initial theme is applied by an inline script in BaseLayout to avoid a flash) */
const THEME_KEY = 'theme';
const themeToggle = document.querySelector('#theme-toggle');

const getTheme = () => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

const applyTheme = (theme) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    themeToggle.setAttribute('title', `Switch to ${nextTheme} theme`);
};

const saveTheme = (theme) => {
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch {
        // Storage unavailable (private mode, blocked cookies): theme still applies for this page
    }
};

applyTheme(getTheme());

themeToggle.addEventListener('click', () => {
    const theme = getTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    saveTheme(theme);
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