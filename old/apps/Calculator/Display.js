class Display {
    constructor(displayPrevVal, displayCurtVal) {
        this.displayCurtVal = displayCurtVal;
        this.displayPrevVal = displayPrevVal;
        this.logic = new Logic();
        this.operationType = undefined;
        this.curtVal = '';
        this.prevVal = '';
        this.signes = {
            add: '+',
            divide: '/',
            substract: '-',
            multiple: 'X',
        }
    }

    delete() {
        this.curtVal = this.curtVal.toString().slice(0,-1);
        this.printValues();
    }

    deleteAll() {
        this.curtVal = '';
        this.prevVal = '';
        this.operationType = undefined;
        this.printValues();
    }

    operate(tipo) {
        this.operationType !== 'equal' && this.calculate();
        this.operationType = tipo;
        this.prevVal = this.curtVal || this.prevVal;
        this.curtVal = '';
        this.printValues();
    }

    addNumber(number) {
        if(number === '.' && this.curtVal.includes('.')) return
        this.curtVal = this.curtVal.toString() + number.toString();
        this.printValues();
    }

    printValues() {
        this.displayCurtVal.textContent = this.curtVal;
        this.displayPrevVal.textContent = `${this.prevVal} ${this.signes[this.operationType] || ''}`;
    }

    calculate() {
        const prevVal = parseFloat(this.prevVal);
        const curtVal = parseFloat(this.curtVal);

        if( isNaN(curtVal) || isNaN(prevVal) ) return
        this.curtVal = this.logic[this.operationType](prevVal, curtVal);
    }
}