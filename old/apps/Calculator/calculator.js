const displayPrevVal = document.getElementById('prev-val');
const displayCurtVal = document.getElementById('curt-val');
const buttonNumber = document.querySelectorAll('.number');
const buttonOperator = document.querySelectorAll('.operator');

const display = new Display(displayPrevVal, displayCurtVal);

buttonNumber.forEach(button => {
    button.addEventListener('click', () => display.addNumber(button.innerHTML));
});

buttonOperator.forEach(button => {
    button.addEventListener('click', () => display.operate(button.value));
});